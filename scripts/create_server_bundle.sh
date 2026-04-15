#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RELEASE_DIR="$ROOT_DIR/release"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
BUNDLE_NAME="site-arnaldo-antunes-server-bundle-${TIMESTAMP}.tar.gz"
BUNDLE_PATH="$RELEASE_DIR/$BUNDLE_NAME"

mkdir -p "$RELEASE_DIR"

cd "$ROOT_DIR"

tar -czf "$BUNDLE_PATH" \
  --exclude='./.git' \
  --exclude='./node_modules' \
  --exclude='./dist' \
  --exclude='./release' \
  --exclude='./.env' \
  --exclude='./*.log' \
  --exclude='./website_image.tar' \
  --exclude='./api_image.tar' \
  .

echo "Bundle criado: $BUNDLE_PATH"
echo
echo "Proximos passos:"
echo "1) Copie para o servidor: scp '$BUNDLE_PATH' user@host:/opt/site-arnaldo-antunes/"
echo "2) No servidor: cd /opt/site-arnaldo-antunes && tar -xzf '$BUNDLE_NAME'"
echo "3) Configure .env e rode: ./scripts/start_server_stack.sh"
