
using System.ComponentModel.DataAnnotations;

namespace API.Models;

public class Cliente
{
    public int ClienteId { get; set; }
    public string? Nome { get; set; }
    [Required]
    public string? Telefone { get; set; }
    [Required]
    [RegularExpression(@"^\d{11}$", ErrorMessage = "O CPF deve conter exatamente 11 números.")]
    public string? CPF { get; set; }
}