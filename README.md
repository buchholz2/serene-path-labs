# Site Psicologo Arnaldo Antunes

Landing page profissional de psicologia com foco em conversao para atendimento online.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- i18n simples (PT/EN via contexto React)
- API Node.js + Express para envio de contato por email (Resend)

## Funcionalidades

- Navegacao one-page com secoes: inicio, sobre, servicos, como funciona e contato
- Formulario de contato com envio real para API (`/api/contact`)
- Fallback de envio: link para Google Forms e WhatsApp
- Botao flutuante de WhatsApp
- Layout responsivo para desktop e mobile
- Animacoes suaves de entrada ao rolar a pagina

## Como rodar localmente

```bash
npm install
# terminal 1
npm run dev:api

# terminal 2
npm run dev
```

Aplicacao em desenvolvimento: `http://localhost:8080`
API local: `http://localhost:3001`

### Configuracao da API de email

1. Crie um arquivo `.env` na raiz (pode copiar de `.env.example`).
2. Preencha `RESEND_API_KEY`, `MAIL_TO` e `MAIL_FROM`.
3. Teste a saude da API:

```bash
curl http://localhost:3001/api/health
```

### Rodando com Docker Compose

```bash
cp .env.example .env
# edite as variaveis do Resend no .env
docker compose up -d --build
```

## Scripts disponiveis

- `npm run dev`: inicia o servidor local
- `npm run dev:api`: inicia a API de contato local em modo watch
- `npm run start:api`: inicia a API de contato em producao
- `npm run build`: gera build de producao
- `npm run build:dev`: gera build no modo development
- `npm run preview`: visualiza o build localmente
- `npm run lint`: executa o ESLint
- `npm run test`: executa os testes com Vitest
- `npm run test:watch`: executa testes em modo observacao

## Personalizacao rapida

- Links de contato: `src/lib/constants.ts`
- Textos PT/EN: `src/i18n/translations.ts`
- Imagens e favicon: pasta `public/`
- Endpoint de contato: `server/index.mjs`
- Configuracao Docker da API: `Dockerfile.api` e `docker-compose.yml`
