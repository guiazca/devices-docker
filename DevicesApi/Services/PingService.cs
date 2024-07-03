using System.Net.NetworkInformation;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.Models;

namespace DevicesApi.Services
{
    public class PingService
    {
        private readonly ApplicationDbContext _context;
        private readonly ILogger<PingService> _logger;

        public PingService(ApplicationDbContext context, ILogger<PingService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task PingDevicesAsync()
        {
            var devices = await _context.Dispositivos.ToListAsync();
            foreach (var device in devices)
            {
                var pingStatus = await PingDevice(device.IP);
                device.IsOnline = pingStatus;
                _context.Entry(device).State = EntityState.Modified;
            }
            await _context.SaveChangesAsync();
        }

        private async Task<bool> PingDevice(string ipAddress)
        {
            using (var ping = new Ping())
            {
                try
                {
                    var reply = await ping.SendPingAsync(ipAddress, 1000);
                    return reply.Status == IPStatus.Success;
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error pinging device {ipAddress}");
                    return false;
                }
            }
        }
    }
}
