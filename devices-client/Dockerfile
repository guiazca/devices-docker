# Etapa 1: Construir o frontend
FROM node:16 AS build-frontend
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servir a aplicação
FROM nginx:alpine
COPY --from=build-frontend /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
