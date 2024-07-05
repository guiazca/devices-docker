#!/bin/sh

# Aplica as migrações do Entity Framework Core
dotnet ef database update

# Inicia a aplicação
exec dotnet DevicesApi.dll
