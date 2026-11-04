#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ -e .env ]; then
  echo "cms/.env already exists; leaving it unchanged."
  exit 1
fi
umask 077
random() { openssl rand -hex 32; }
cat > .env <<EOF
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://strapi.rmsolohome.com
DATABASE_NAME=strapi
DATABASE_USERNAME=strapi
DATABASE_PASSWORD=$(random)
APP_KEYS=$(random),$(random),$(random),$(random)
API_TOKEN_SALT=$(random)
ADMIN_JWT_SECRET=$(random)
TRANSFER_TOKEN_SALT=$(random)
JWT_SECRET=$(random)
ENCRYPTION_KEY=$(random)
EOF
echo "Created private cms/.env with random secrets. Back it up securely."
