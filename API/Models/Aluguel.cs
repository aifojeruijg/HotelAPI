namespace API.Models;

public class Aluguel 
{
    public int AluguelId { get; set; }
    public int ClienteId { get; set; }
    public Cliente? Cliente { get; set; }
    public int QuartoId { get; set; }
    public Quarto? Quarto { get; set; }
    public int Dias { get; set; }
    public double ValorTotal { get; set; }
}