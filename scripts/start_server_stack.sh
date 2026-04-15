#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
COMPOSE_FILE="$ROOT_DIR/docker-compose.server.yml"

cd "$ROOT_DIR"

if [ ! -f ".env" ]; then
  echo "ERRO: arquivo .env nao encontrado em $ROOT_DIR"
  echo "Copie .env.example para .env e ajuste RESEND_API_KEY/MAIL_TO/MAIL_FROM."
  exit 1
fi

docker compose -f "$COMPOSE_FILE" --env-file .env up -d --build

echo
echo "Stack iniciado."
docker compose -f "$COMPOSE_FILE" ps

echo
echo "Health local da API:"
curl -s http://localhost:3001/api/health || true
