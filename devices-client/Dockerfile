# Etapa 1: Construir o frontend
FROM node:16 AS build-frontend
WORKDIR /app
# Clonar o repositório e copiar o conteúdo
COPY . .
# Mostrar o conteúdo do diretório para verificar se os arquivos estão presentes
RUN ls -la
# Instalar dependências e construir o frontend
RUN yarn install
# Mostrar dependências instaladas
RUN yarn list
# Executar o build
RUN yarn build

# Etapa 2: Servir a aplicação
FROM nginx:alpine
COPY --from=build-frontend /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
