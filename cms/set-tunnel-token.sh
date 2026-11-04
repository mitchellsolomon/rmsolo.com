#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
if [ ! -f .env ]; then
  echo "Run setup-env.sh first."
  exit 1
fi
read -r -s -p "Paste the Cloudflare Tunnel token (hidden): " token
printf '\n'
if [ -z "$token" ]; then
  echo "No token entered."
  exit 1
fi
umask 077
temp=$(mktemp .env.XXXXXX)
trap 'rm -f "$temp"' EXIT
grep -v '^TUNNEL_TOKEN=' .env > "$temp"
printf 'TUNNEL_TOKEN=%s\n' "$token" >> "$temp"
mv "$temp" .env
trap - EXIT
unset token
docker compose --profile tunnel up -d cloudflared
