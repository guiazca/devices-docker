namespace DevicesApi.Models
{
    public class Dispositivo
    {
        public int Id { get; set; }
        public int ModeloId { get; set; }
        public int LocalizacaoId { get; set; }
        public int CategoriaId { get; set; }
        public string? Nome { get; set; }
        public string IP { get; set; }
        public int? Porta { get; set; }
        public string URL { get; set; }
        public string? MacAddress { get; set; }
        public string? Descricao { get; set; }
        public bool IsOnline { get; set; } // Adiciona IsOnline

        public Modelo Modelo { get; set; }
        public Localizacao Localizacao { get; set; }
        public Categoria Categoria { get; set; }
    }
}
