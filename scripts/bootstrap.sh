#!/usr/bin/env bash
set -euo pipefail

# Bootstrap script:
# 1) start only the SurrealDB service
# 2) wait for HTTP /health to be available (with timeout)
# 3) run migrations (scripts/migrations.sh) using the local `surreal` CLI
# 4) start the API

COMPOSE_CMD="docker compose"
SURREAL_ENDPOINT=${SURREAL_ENDPOINT:-http://127.0.0.1:8000}
HEALTH_URL=${HEALTH_URL:-http://127.0.0.1:8000/health}
TIMEOUT=${TIMEOUT:-60}

echo "Starting SurrealDB..."
$COMPOSE_CMD up -d surrealdb

echo -n "Waiting for SurrealDB HTTP /health"
start_ts=$(date +%s)
while true; do
  if curl -sSf "$HEALTH_URL" > /dev/null 2>&1; then
    echo " — up"
    break
  fi
  now=$(date +%s)
  if [ $((now - start_ts)) -ge "$TIMEOUT" ]; then
    echo
    echo "Timed out waiting for SurrealDB at $HEALTH_URL after ${TIMEOUT}s"
    exit 1
  fi
  printf '.'
  sleep 1
done

echo "Running migrations (using scripts/migrations.sh)"
# Export env so scripts/migrations.sh can pick them up if needed
export SURREAL_ENDPOINT
export SURREAL_USER=${SURREAL_USER:-root}
export SURREAL_PASS=${SURREAL_PASS:-root}

if [ ! -x ./scripts/migrations.sh ]; then
  # Make executable if possible
  chmod +x ./scripts/migrations.sh || true
fi

./scripts/migrations.sh

echo "Starting API..."
$COMPOSE_CMD up --build -d api

echo "Bootstrap complete."
