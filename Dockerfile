# Etapa 1: Construir o frontend
FROM node:16 AS build-frontend
WORKDIR /app
# Clonar o repositório do frontend
RUN git clone https://github.com/guiazca/devices-client.git .
# Instalar dependências e construir o frontend
RUN npm install
RUN npm run build

# Etapa 2: Construir o backend
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-backend
WORKDIR /app
# Clonar o repositório do backend
RUN git clone https://github.com/guiazca/DevicesApi.git .
WORKDIR /app/DevicesApi
# Mostrar o conteúdo do diretório para verificar se os arquivos estão presentes
RUN ls -la
# Restaurar dependências com logs detalhados
RUN dotnet restore --verbosity diagnostic
# Publicar o projeto
RUN dotnet publish -c Release -o out

# Etapa 3: Executar a aplicação
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-backend /app/DevicesApi/out .
COPY --from=build-frontend /app/build ./wwwroot

# Configuração de ambiente
ENV ASPNETCORE_URLS=http://+:5000
ENV ASPNETCORE_ENVIRONMENT=Production

# Porta exposta
EXPOSE 5000

# Comando de inicialização
ENTRYPOINT ["dotnet", "DevicesApi.dll"]
