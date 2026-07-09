# Etapa 1: Construcción (Builder)
# Usamos la imagen de desarrollo de Chainguard que tiene 0 vulnerabilidades conocidas
FROM cgr.dev/chainguard/node:latest-dev AS builder
WORKDIR /app

# Copiar dependencias
COPY package*.json ./
RUN npm ci

# Copiar código y compilar
COPY . .
RUN npm run build

# Generar un archivo de configuración de Nginx garantizado en una carpeta temporal con permisos
RUN echo "events {} \
http { \
    include /etc/nginx/mime.types; \
    server { \
        listen 8080; \
        root /usr/share/nginx/html; \
        index index.html; \
        location / { \
            try_files \$uri \$uri/ /index.html; \
        } \
    } \
}" > /tmp/nginx.conf

# Etapa 2: Producción (Servidor Nginx Seguro sin vulnerabilidades)
FROM cgr.dev/chainguard/nginx:latest

# Copiar el build y la configuración
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /tmp/nginx.conf /etc/nginx/nginx.conf

# La imagen chainguard expone 8080 por defecto
EXPOSE 8080
