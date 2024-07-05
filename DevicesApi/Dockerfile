# Etapa 1: Build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copie os arquivos do projeto e restaure as dependências
COPY *.csproj ./
RUN dotnet restore

# Instale as ferramentas do Entity Framework Core
RUN dotnet tool install --global dotnet-ef

# Adicione a pasta de ferramentas global ao PATH
ENV PATH="$PATH:/root/.dotnet/tools"

# Copie o restante dos arquivos e compile o projeto
COPY . ./
RUN dotnet publish -c Release -o out

# Etapa 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Adicione a pasta de ferramentas global ao PATH no runtime
ENV PATH="$PATH:/root/.dotnet/tools"

# Execute as migrações e inicie o aplicativo
ENTRYPOINT ["sh", "-c", "dotnet ef database update && dotnet DevicesApi.dll"]

