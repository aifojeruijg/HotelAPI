using System.Runtime.Serialization;

namespace API.Models;

public class Quarto
{
   public int QuartoId { get; set; }
    public int NumeroQuarto { get; set; }
    public string? TipoQuarto { get; set; }
    public double Diaria { get; set; }
    public string Status { get; set; } = "Disponível";

}