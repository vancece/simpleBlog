#!/bin/bash
set -e

DOMAIN="workly.cloud"
EMAIL="admin@workly.cloud"

echo "=== 1. 停止现有容器 ==="
docker stop my-blog 2>/dev/null && docker rm my-blog 2>/dev/null || true
docker compose down 2>/dev/null || true

echo "=== 2. 使用初始配置启动 Nginx（仅 HTTP）==="
# 临时用 init 配置启动
docker compose run -d --name my-blog-init \
  -p 80:80 \
  -v $(pwd)/nginx-init.conf:/etc/nginx/conf.d/default.conf:ro \
  -v certbot-www:/var/www/certbot:ro \
  blog nginx -g "daemon off;"

echo "=== 3. 申请 Let's Encrypt 证书 ==="
docker compose run --rm certbot certonly \
  --webroot \
  --webroot-path=/var/www/certbot \
  --email $EMAIL \
  --agree-tos \
  --no-eff-email \
  -d $DOMAIN \
  -d www.$DOMAIN

echo "=== 4. 停止临时容器 ==="
docker stop my-blog-init && docker rm my-blog-init

echo "=== 5. 使用完整 HTTPS 配置启动 ==="
docker compose up -d blog

echo ""
echo "✅ 完成！访问 https://$DOMAIN 查看博客"
echo ""
echo "💡 自动续期已通过 crontab 设置，也可手动续期："
echo "   docker compose run --rm certbot renew"
