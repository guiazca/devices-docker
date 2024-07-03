using Microsoft.EntityFrameworkCore;
using DevicesApi.Models;

namespace DevicesApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Modelo> Modelos { get; set; }
        public DbSet<Dispositivo> Dispositivos { get; set; }
        public DbSet<Localizacao> Localizacoes { get; set; }
        public DbSet<Software> Softwares { get; set; }
    }
}
