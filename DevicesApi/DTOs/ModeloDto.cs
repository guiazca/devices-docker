namespace DevicesApi.DTOs
{
    public class ModeloDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int MarcaId { get; set; }
        public string? MarcaNome { get; set; }
    }
}
