#!/usr/bin/env bash
# Publica dist/ en el servidor propio (nginx sirve /var/www/optisain).
#
# Uso:
#   DEPLOY_HOST=usuario@servidor ./scripts/deploy.sh
#
# Antes: npm run build && npm run check
# No toca nginx ni el certificado. Deja intacto el robots.txt del servidor (que hoy
# prohíbe indexar mientras no haya dominio propio), por eso se excluye del paquete.
set -euo pipefail

: "${DEPLOY_HOST:?Define DEPLOY_HOST, por ejemplo DEPLOY_HOST=usuario@servidor}"
REMOTE_DIR="${REMOTE_DIR:-/var/www/optisain}"
OWNER="${OWNER:-www-data}"

cd "$(dirname "$0")/.."
[ -f dist/index.html ] || { echo "No hay dist/. Corre primero: npm run build" >&2; exit 1; }

PAQUETE="optisain-dist.tar"
tar -C dist --exclude=robots.txt -cf "/tmp/${PAQUETE}" .
scp "/tmp/${PAQUETE}" "${DEPLOY_HOST}:/tmp/${PAQUETE}"

ssh "${DEPLOY_HOST}" bash -s <<EOF
set -euo pipefail
sudo tar -xf /tmp/${PAQUETE} -C ${REMOTE_DIR} --no-same-owner
sudo chown -R \$(id -un):${OWNER} ${REMOTE_DIR}
sudo find ${REMOTE_DIR} -type d -exec chmod 755 {} +
sudo find ${REMOTE_DIR} -type f -exec chmod 644 {} +
rm -f /tmp/${PAQUETE}
EOF

rm -f "/tmp/${PAQUETE}"
echo "Publicado en ${DEPLOY_HOST}:${REMOTE_DIR}"
