using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace DevicesApi.Services
{
    public static class PingJob
    {
        public static async Task Execute(IServiceProvider serviceProvider)
        {
            using (var scope = serviceProvider.CreateScope())
            {
                var pingService = scope.ServiceProvider.GetRequiredService<PingService>();
                await pingService.PingDevicesAsync();
            }
        }
    }
}
