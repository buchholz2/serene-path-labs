# Deploy Externo (Servidor + Dominio)

Este guia sobe o site em um servidor externo com Docker, com frontend em `:8080` e API em `:3001`.

## 1) Pre-requisitos

- Docker + Docker Compose no servidor
- DNS do dominio apontando para o IP do servidor
- Conta Resend ativa

## 2) Configurar envio de email (Resend)

No painel do Resend:

1. Crie ou use uma API key
2. (Producao) Verifique um dominio em `resend.com/domains`
3. Use um remetente do dominio verificado no `MAIL_FROM`

Observacao importante:

- Se usar `onboarding@resend.dev`, o Resend permite envio apenas para o email da propria conta (modo teste).

## 3) Configurar `.env`

Copie `.env.example` para `.env` e ajuste:

```bash
cp .env.example .env
```

Exemplo:

```env
PORT=3001
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
MAIL_TO=psicologoantunes@gmail.com
MAIL_FROM=Site Arnaldo <contato@seu-dominio.com>
```

## 4) Subir stack no servidor

```bash
./scripts/start_server_stack.sh
```

Ou manualmente:

```bash
docker compose -f docker-compose.server.yml --env-file .env up -d --build
```

## 5) Configurar dominio externo

### Opcao A (Nginx Proxy Manager)

- Proxy host para `http://SEU_SERVIDOR:8080`
- Habilite SSL/Let's Encrypt

### Opcao B (Nginx tradicional)

Configure reverse proxy do dominio para `http://127.0.0.1:8080`.

## 6) Validar deploy

```bash
# API health no servidor
curl -s http://127.0.0.1:3001/api/health

# API health via dominio
curl -s https://SEU_DOMINIO/api/health

# teste de envio
curl -s -X POST https://SEU_DOMINIO/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@example.com","message":"teste","lang":"pt"}'
```

## 7) Gerar pacote `.tar.gz` para envio

No ambiente local:

```bash
./scripts/create_server_bundle.sh
```

O bundle sai em `release/`.
