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

# Etapa 2: Producción (Servidor Nginx Seguro)
# Usamos la imagen de producción de Chainguard (Distroless, sin terminal, 0 CVEs)
FROM cgr.dev/chainguard/nginx:latest

# Copiar el build
COPY --from=builder /app/dist /usr/share/nginx/html

# La imagen chainguard expone 8080 por defecto
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
