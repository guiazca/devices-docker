using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using Microsoft.OpenApi.Models;
using Hangfire;
using Hangfire.MemoryStorage;
using DevicesApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Adicionando serviços ao contêiner.
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

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Devices API", Version = "v1" });
});

// Configuração do Hangfire
builder.Services.AddHangfire(config =>
    config.SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
          .UseSimpleAssemblyNameTypeSerializer()
          .UseDefaultTypeSerializer()
          .UseMemoryStorage());
builder.Services.AddHangfireServer();

builder.Services.AddScoped<PingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
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
    app.Run();
