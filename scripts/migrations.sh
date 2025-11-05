#!/usr/bin/env bash
set -euo pipefail

# migrations.sh
# Import all .surql files in src/db/schema in lexicographic order using the
# `surreal` CLI. The endpoint can be overridden via SURREAL_ENDPOINT env var.

SURREAL_ENDPOINT=${SURREAL_ENDPOINT:-http://127.0.0.1:8000}
NAMESPACE=${NAMESPACE:-test}
DATABASE=${DATABASE:-test}
USER=${SURREAL_USER:-root}
PASS=${SURREAL_PASS:-root}

for f in $(ls src/db/schema/*.surql | sort); do
  echo "Importing $f"
  surreal import "$f" \
    --namespace "$NAMESPACE" \
    --database "$DATABASE" \
    --username "$USER" \
    --password "$PASS" \
    --endpoint "$SURREAL_ENDPOINT" \
  || { echo "Import failed on $f"; exit 1; }
done