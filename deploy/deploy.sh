#!/usr/bin/env bash
set -euo pipefail

AWS_REGION="${AWS_REGION:?AWS_REGION is required}"
ECR_REGISTRY="${ECR_REGISTRY:?ECR_REGISTRY is required}"
ECR_REPOSITORY="${ECR_REPOSITORY:?ECR_REPOSITORY is required}"
IMAGE_TAG="${IMAGE_TAG:-latest}"
HOST_PORT="${HOST_PORT:-80}"
DEPLOY_DIR="${DEPLOY_DIR:-$HOME/portfolio-red}"

mkdir -p "${DEPLOY_DIR}"
cd "${DEPLOY_DIR}"

aws ecr get-login-password --region "${AWS_REGION}" \
  | docker login --username AWS --password-stdin "${ECR_REGISTRY}"

export ECR_REGISTRY ECR_REPOSITORY IMAGE_TAG HOST_PORT
docker compose pull
docker compose up -d --remove-orphans
docker image prune -f
