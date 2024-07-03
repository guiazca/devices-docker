namespace DevicesApi.Models
{
    public class Marca
    {
        public int Id { get; set; }
        public string Nome { get; set; }

       public ICollection<Modelo> Modelos { get; set; }
    }
}
