# Site Psicologo Arnaldo Antunes

Landing page profissional de psicologia com foco em conversao para atendimento online.

## Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS
- i18n simples (PT/EN via contexto React)

## Funcionalidades

- Navegacao one-page com secoes: inicio, sobre, servicos, como funciona e contato
- Formulario de contato com abertura de email pre-preenchido
- Botao flutuante de WhatsApp
- Layout responsivo para desktop e mobile
- Animacoes suaves de entrada ao rolar a pagina

## Como rodar localmente

```bash
npm install
npm run dev
```

Aplicacao em desenvolvimento: `http://localhost:8080`

## Scripts disponiveis

- `npm run dev`: inicia o servidor local
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
