using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using Microsoft.OpenApi.Models;
using Hangfire;
using Hangfire.MemoryStorage;
using DevicesApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

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

    // Configuração de autenticação JWT
    var key = Encoding.ASCII.GetBytes(configuration["Jwt:Key"]);
    services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Jwt:Issuer"],
            ValidAudience = configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

    // Outros serviços
    services.AddScoped<PingService>();
    services.AddControllers();
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new OpenApiInfo { Title = "Devices API", Version = "v1" });
        // Adicionando suporte à autenticação no Swagger
        c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
        {
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
            Name = "Authorization",
            In = ParameterLocation.Header,
            Type = SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });

        c.AddSecurityRequirement(new OpenApiSecurityRequirement{
            {
                new OpenApiSecurityScheme{
                    Reference = new OpenApiReference{
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
                Array.Empty<string>()
            }
        });
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
    app.UseAuthentication(); // Adicionar autenticação ao pipeline
    app.UseAuthorization();
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
