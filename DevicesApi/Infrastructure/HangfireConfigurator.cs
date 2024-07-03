using Hangfire;
using Microsoft.Extensions.DependencyInjection;
using DevicesApi.Services;

namespace DevicesApi.Infrastructure
{
    public static class HangfireConfigurator
    {
        public static void ConfigureRecurringJobs(IRecurringJobManager recurringJobManager, IServiceScopeFactory serviceScopeFactory)
        {
            recurringJobManager.AddOrUpdate(
                "PingDevices",
                () => ExecutePingJob(serviceScopeFactory),
                "0 2 * * 0"); // Às 2:00 da manhã todos os domingos
        }

        public static Task ExecutePingJob(IServiceScopeFactory serviceScopeFactory)
        {
            using (var scope = serviceScopeFactory.CreateScope())
            {
                var pingService = scope.ServiceProvider.GetRequiredService<PingService>();
                return pingService.PingDevicesAsync();
            }
        }
    }
}
