#!/bin/bash

# Diretório base
BASEDIR=$(dirname "$0")
cd "$BASEDIR"

# Log file (ajustado para pasta do projeto para evitar erro de permissao)
LOGFILE="./deploy_arnaldo.log"
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# --- Variaveis de Destino (VPS Oracle) ---
VPS_USER="deployer"
VPS_IP="10.0.50.1"
VPS_DESTINATION="/opt/site-arnaldo-antunes/"

# --- Funcoes de Log ---
log_message() {
    echo "$DATE - $1" | tee -a "$LOGFILE"
}

# --- 1. Puxar o Código Mais Recente ---
log_message "Sincronizando alteracoes locais com GitHub..."
git add .
git commit -m "Auto-deploy: $DATE"
git push origin main
log_message "GitHub atualizado."
log_message "Iniciando Git Pull..."
GIT_OUTPUT=$(git pull origin main 2>&1)
log_message "$GIT_OUTPUT"

# Se nao houver alteracao, sai (Opcional: comente se quiser forcar o deploy)
#if echo "$GIT_OUTPUT" | grep -q "Already up to date."; then
#    log_message "Nenhuma alteracao no Git. Pipeline encerrado."
#    exit 0
#fi

# --- 2. Buildar a Imagem ---
log_message "Alteracoes detectadas. Iniciando Docker Compose Build..."

if docker compose build; then
    log_message "Build da Imagem concluido com sucesso."
else
    log_message "ERRO: Falha durante o Docker Compose Build."
    exit 1
fi

# --- 3. Exportar a Imagem para Arquivo .tar ---
log_message "Exportando imagem para arquivo .tar..."

# Ajuste o nome da imagem conforme definido no seu docker-compose.yml
WEB_IMAGE="site-arnaldo-web:latest"

if docker save -o website_image.tar $WEB_IMAGE; then
    log_message "Imagem (.tar) salva com sucesso."
else
    log_message "ERRO: Falha ao salvar a imagem."
    exit 1
fi

# --- 4. Transferir para a VPS Oracle (SCP) ---
log_message "Iniciando transferencia para a VPS Oracle..."

TRANSFER_SUCCESS=true
# Garante que a rede e a pasta existam na Oracle
ssh-i ~/.ssh/id_rsa_oracle ${VPS_USER}@${VPS_IP} "docker network create nginxproxyman 2>/dev/null; mkdir -p ${VPS_DESTINATION}"
# Garante que o diretorio exista e envia os arquivos
ssh -i ~/.ssh/id_rsa_oracle ${VPS_USER}@${VPS_IP} "mkdir -p ${VPS_DESTINATION}"
scp -i ~/.ssh/id_rsa_oracle docker-compose.yml website_image.tar ${VPS_USER}@${VPS_IP}:${VPS_DESTINATION} || TRANSFER_SUCCESS=false

if ! $TRANSFER_SUCCESS; then
    log_message "ERRO FATAL: Falha na transferencia SCP."
    exit 1
fi

# --- 5. Iniciar o Deploy Remoto ---
log_message "Acionando deploy remoto na VPS Oracle..."

DEPLOY_COMMAND="
  cd ${VPS_DESTINATION} &&
  echo 'Carregando imagem...' &&
  docker load -i website_image.tar &&
  echo 'Subindo container...' &&
  docker compose up -d --force-recreate &&
  echo 'Limpando arquivo .tar...' &&
  rm website_image.tar &&
  echo 'Deploy remoto concluido.'
"

if ssh -i ~/.ssh/id_rsa_oracle ${VPS_USER}@${VPS_IP} "${DEPLOY_COMMAND}"; then
    log_message "Deploy remoto concluido com sucesso."
else
    log_message "ERRO: Falha no deploy remoto."
    exit 1
fi

log_message "Pipeline do Arnaldo concluida com sucesso."
