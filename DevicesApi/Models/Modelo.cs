namespace DevicesApi.Models
{
    public class Modelo
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int MarcaId { get; set; }

        public Marca Marca { get; set; }
    }
}
