#!/usr/bin/env bash
#
# Copia COMPLETA (esquema + datos + historial de migraciones) de la branch de
# dev hacia otra base Postgres (prod). Es un dump/restore puntual, NO una
# replicacion continua.
#
#   ORIGEN  : DIRECT_URL del apps/web/.env (la branch de dev)
#   DESTINO : variable de entorno PROD_DATABASE_URL (usar el endpoint DIRECTO,
#             sin "-pooler", de la branch de prod)
#
# Uso (dry-run: solo muestra que haria):
#   PROD_DATABASE_URL='postgresql://...neon.tech/db?sslmode=require' \
#     bash apps/web/scripts/migrate-db-to-prod.sh
#
# Uso (ejecuta de verdad, SOBREESCRIBE el destino):
#   CONFIRM=yes PROD_DATABASE_URL='postgresql://...' \
#     bash apps/web/scripts/migrate-db-to-prod.sh
#
set -euo pipefail

PG_BIN="/opt/homebrew/opt/postgresql@17/bin"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../.env"

[ -f "$ENV_FILE" ] || { echo "No encuentro $ENV_FILE"; exit 1; }
set -a; . "$ENV_FILE"; set +a

SOURCE="${DIRECT_URL:?DIRECT_URL no esta en .env}"
TARGET="${PROD_DATABASE_URL:?Defini PROD_DATABASE_URL con la connection string DIRECTA de prod}"

host_of(){ echo "$1" | sed -E 's#.*@([^/?]+).*#\1#'; }

echo "ORIGEN  (dev) : $(host_of "$SOURCE")"
echo "DESTINO (prod): $(host_of "$TARGET")"
echo

if [ "${CONFIRM:-}" != "yes" ]; then
  echo "DRY-RUN. No se toco nada."
  echo "Para ejecutar de verdad volve a correr con  CONFIRM=yes  adelante."
  exit 0
fi

case "$(host_of "$TARGET")" in
  *-pooler*) echo "AVISO: el destino usa el endpoint -pooler. Usa el DIRECTO para restore."; exit 1;;
esac

DUMP="$(mktemp -t devdump).dump"
trap 'rm -f "$DUMP"' EXIT

echo ">> Dumpeando origen..."
"$PG_BIN/pg_dump" "$SOURCE" --no-owner --no-acl -Fc -f "$DUMP"

echo ">> Restaurando en destino (drop + recreate)..."
"$PG_BIN/pg_restore" --no-owner --no-acl --clean --if-exists -d "$TARGET" "$DUMP" || \
  echo "(pg_restore reporto algunos avisos; suelen ser DROP de objetos inexistentes o COMMENT de extensiones, inofensivos)"

echo ">> Conteos en destino:"
"$PG_BIN/psql" "$TARGET" -t -c "select relname, n_live_tup from pg_stat_user_tables order by relname;"

echo ">> Listo."
