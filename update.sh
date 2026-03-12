#!/bin/bash
set -e

echo "🔄 拉取最新镜像..."
docker pull vancece/simple-blog:latest

echo "🔁 重启服务..."
docker compose down blog
docker compose up -d blog

echo "🧹 清理旧镜像..."
docker image prune -f

echo ""
echo "✅ 更新完成！访问 https://workly.cloud"
