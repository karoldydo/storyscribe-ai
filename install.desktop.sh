#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NO_COLOR='\033[0m'

command() {
  local name="$1"
  local cmd="$2"
  echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] ${name}..."
  local start end duration
  start=$(date +%s)
  if ${cmd} > /dev/null 2>&1; then
    end=$(date +%s)
    duration=$((end - start))
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')] ${name^} build succeeded! (${duration}s)${NO_COLOR}"
  else
    end=$(date +%s)
    duration=$((end - start))
    echo -e "${RED}[$(date '+%Y-%m-%d %H:%M:%S')] ${name^} build failed! (${duration}s)${NO_COLOR}"
  fi
}


# install dependencies and build packages
command "Installing dependencies" "yarn install"
command "Building client package" "yarn client:build"
command "Building server package" "yarn server:build"

# build and start docker services
command "Stopping docker services" "docker compose -f packages/docker/desktop/docker-compose.cpu.yml stop"
command "Building docker images" "docker compose -f packages/docker/desktop/docker-compose.cpu.yml build --pull --no-cache"
command "Starting docker services" "docker compose -f packages/docker/desktop/docker-compose.cpu.yml up -d"

echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] Waiting for docker services to start..."
sleep 10 # Wait for services to start

# create and start models
command "Creating llama3:8b model" "docker exec ollama-service ollama create llama -f ./tmp/models/llama/Modelfile"
command "Starting llama3:8b model" "docker exec ollama-service ollama run llama"
command "Creating mistral:7b model" "docker exec ollama-service ollama create mistral -f ./tmp/models/mistral/Modelfile"
command "Starting mistral:7b model" "docker exec ollama-service ollama run mistral"

echo -e "[$(date '+%Y-%m-%d %H:%M:%S')] The installation process is complete!"
