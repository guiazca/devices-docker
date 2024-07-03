# Etapa 1: Construir o frontend
FROM node:18 AS build-frontend
WORKDIR /app
# Copiar o conteúdo
COPY . .
# Remover package-lock.json para evitar conflitos de gerenciadores de pacotes
RUN rm -f package-lock.json
# Mostrar o conteúdo do diretório para verificar se os arquivos estão presentes
RUN ls -la
# Instalar dependências e construir o frontend
RUN yarn install
# Mostrar dependências instaladas
RUN yarn list
# Executar o build
RUN yarn build

# Verificar o conteúdo do diretório de build
RUN ls -la dist

# Etapa 2: Servir a aplicação
FROM nginx:alpine
# Copiar os arquivos de build para o diretório do NGINX
COPY --from=build-frontend /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
