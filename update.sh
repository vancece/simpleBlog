#!/bin/bash
set -e

IMAGE="vancece/simple-blog:latest"
CONTAINER="my-blog"
SSL_CONF_URL="https://raw.githubusercontent.com/vancece/simpleBlog/main/nginx-ssl.conf"

echo "🔄 拉取最新镜像..."
docker pull $IMAGE

echo "🔁 重启容器..."
docker stop $CONTAINER 2>/dev/null && docker rm $CONTAINER 2>/dev/null || true

if [ -d "/etc/letsencrypt/live/workly.cloud" ]; then
  echo "🔒 检测到 SSL 证书，启用 HTTPS..."

  # 下载 SSL 配置
  mkdir -p /opt/blog
  curl -fsSL $SSL_CONF_URL -o /opt/blog/nginx-ssl.conf

  docker run -d -p 80:80 -p 443:443 \
    --name $CONTAINER \
    --restart=always \
    -v /opt/blog/nginx-ssl.conf:/etc/nginx/conf.d/default.conf:ro \
    -v /etc/letsencrypt:/etc/letsencrypt:ro \
    -v /var/www/certbot:/var/www/certbot:ro \
    $IMAGE
else
  echo "⚠️  未检测到 SSL 证书，仅使用 HTTP..."
  docker run -d -p 80:80 \
    --name $CONTAINER \
    --restart=always \
    $IMAGE
fi

echo "🧹 清理旧镜像..."
docker image prune -f

echo ""
echo "✅ 更新完成！"
