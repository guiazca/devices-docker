# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie os arquivos do projeto e restaure as dependências
COPY *.csproj ./
RUN dotnet restore

# Copie o restante dos arquivos e compile o projeto
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Copie o script de entrada
COPY entrypoint.sh .

# Defina as permissões de execução para o script de entrada
RUN chmod +x entrypoint.sh

# Defina o script de entrada como o ponto de entrada do contêiner
ENTRYPOINT ["./entrypoint.sh"]
