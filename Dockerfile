# syntax=docker/dockerfile:1
FROM nginx:1.25-alpine

LABEL maintainer="MoklokovaKs"
LABEL version="2.0"
LABEL description="Frontend service v2.0 (static + Nginx proxy)"

# Статические файлы
COPY index.html /usr/share/nginx/html/
COPY script.js  /usr/share/nginx/html/

# Своя конфигурация Nginx (проксирует /api/ → backend:8000)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O - http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]