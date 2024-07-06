using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using Microsoft.OpenApi.Models;
using Hangfire;
using Hangfire.MemoryStorage;
using DevicesApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Adicionando serviços ao contêiner.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configuração do CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

// Configuração do Hangfire
builder.Services.AddHangfire(config =>
    config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
          .UseSimpleAssemblyNameTypeSerializer()
          .UseDefaultTypeSerializer()
          .UseMemoryStorage());
builder.Services.AddHangfireServer();

// Outros serviços
builder.Services.AddScoped<PingService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Devices API", Version = "v1" });
});

// Adicionando serviço de logging
builder.Services.AddLogging(config =>
{
    config.AddConsole();
    config.AddDebug();
});

var app = builder.Build();

// Método para aplicar migrações
void ApplyMigrations(WebApplication app)
{
    using (var scope = app.Services.CreateScope())
    {
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
        dbContext.Database.Migrate();
    }
}

// Configurando o pipeline de requisições HTTP.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Devices API v1");
        c.RoutePrefix = string.Empty; // Isso garante que o Swagger estará disponível na raiz
    });
}

app.UseRouting();
app.UseHttpsRedirection();
app.UseCors("AllowAllOrigins");
app.UseAuthorization();
app.UseHangfireDashboard();
app.MapHangfireDashboard();
app.MapControllers();

// Aplicar migrações antes de iniciar a aplicação
ApplyMigrations(app);

// Agendamento do job de ping
var serviceProvider = app.Services;
RecurringJob.AddOrUpdate(
    "PingDevices",
    () => PingJob.Execute(serviceProvider),
    "0 2 * * 0"); // Às 2:00 da manhã todos os domingos

    app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("/swagger");
        return;
    }
    await next();
});


app.Run();
