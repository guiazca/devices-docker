# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie os arquivos do projeto e restaure as dependências
COPY *.csproj ./
RUN dotnet restore

# Copie o restante dos arquivos e compile o projeto
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 3: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Defina a variável de ambiente para a URL base
ENV ASPNETCORE_URLS=http://+:5000

# Defina o ponto de entrada do contêiner
ENTRYPOINT ["dotnet", "DevicesApi.dll"]
