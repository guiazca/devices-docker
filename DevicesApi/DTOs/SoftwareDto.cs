namespace DevicesApi.DTOs
{
    public class SoftwareDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime? DataUltimaAtualizacao { get; set; }
        public string IP { get; set; }
        public int? Porta { get; set; }
        public string? URL { get; set; }
    }
}
