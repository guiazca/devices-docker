using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using Microsoft.OpenApi.Models;
using Hangfire;
using Hangfire.MemoryStorage;
using DevicesApi.Services;
using Microsoft.Extensions.Logging;

var builder = WebApplication.CreateBuilder(args);

// Adicionando serviços ao contêiner.
ConfigureServices(builder.Services, builder.Configuration);

var app = builder.Build();

// Configurando o pipeline de requisições HTTP.
Configure(app, builder.Environment);

app.Run();

void ConfigureServices(IServiceCollection services, IConfiguration configuration)
{
    // Configuração do banco de dados
    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseNpgsql(configuration.GetConnectionString("DefaultConnection")));

    // Configuração do CORS
    services.AddCors(options =>
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
    services.AddHangfire(config =>
        config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
              .UseSimpleAssemblyNameTypeSerializer()
              .UseDefaultTypeSerializer()
              .UseMemoryStorage());
    services.AddHangfireServer();

    // Outros serviços
    services.AddScoped<PingService>();
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Devices API", Version = "v1" });
    });

    // Adicionando serviço de logging
    services.AddLogging(config =>
    {
        config.AddConsole();
        config.AddDebug();
    });
}

void Configure(WebApplication app, IWebHostEnvironment env)
{
    var logger = app.Services.GetRequiredService<ILogger<Program>>();

    // Configuração do ambiente
    if (env.IsDevelopment() || env.IsProduction())
    {
        app.UseDeveloperExceptionPage();
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "Devices API v1");
            c.RoutePrefix = string.Empty;
        });
    }

    app.UseRouting();
    app.UseHttpsRedirection();
    app.UseCors("AllowAllOrigins");
    // Removido app.UseAuthentication(); // Remover autenticação
    // Removido app.UseAuthorization(); // Remover autorização
    app.UseHangfireDashboard();
    app.MapHangfireDashboard();
    app.MapControllers();

    // Agendamento do job de ping
    var serviceProvider = app.Services;
    RecurringJob.AddOrUpdate(
        "PingDevices",
        () => PingJob.Execute(serviceProvider),
        "0 2 * * 0"); // Às 2:00 da manhã todos os domingos

    logger.LogInformation("Aplicação iniciada e configurada.");
}
