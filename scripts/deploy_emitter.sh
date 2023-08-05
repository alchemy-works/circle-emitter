#!/usr/bin/env bash
cd "$(dirname "$0")" || exit 1

cd ..

docker run -d \
  -v "$(pwd):/app" \
  -p 8001:8080 \
  --name circleci-emitter \
  openjdk:20 \
  "/app/scripts/start_emitter.sh"
