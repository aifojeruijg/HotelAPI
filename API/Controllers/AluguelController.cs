using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/aluguel")]
public class AluguelController : ControllerBase
{
    private readonly AppDataContext _ctx;
    public AluguelController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    //POST: api/aluguel/cadastrar
[HttpPost]
[Route("cadastrar")]
public IActionResult Cadastrar([FromBody] Aluguel aluguel)
{
    try
    {
        using (var transaction = _ctx.Database.BeginTransaction())
        {
            var cliente = _ctx.Clientes.Find(aluguel.ClienteId);
            var quarto = _ctx.Quartos.Find(aluguel.QuartoId);

            if (cliente == null || quarto == null)
            {
                return BadRequest("Cliente ou quarto não encontrados.");
            }

            quarto = _ctx.Quartos.FirstOrDefault(q => q.QuartoId == aluguel.QuartoId && q.Status == "Disponível");

            if (quarto == null)
            {
                transaction.Rollback();
                //return Ok(new { message = "Troca de quarto concluída com sucesso." });
                return Conflict(new {message = "O quarto está indisponível!"});
            }
            double valorTotal = quarto.Diaria * aluguel.Dias;
            quarto.Status = "Indisponivel";
            aluguel.ValorTotal = valorTotal;
            _ctx.Alugueis.Add(aluguel);
            _ctx.SaveChanges();

            transaction.Commit();

            return Created("", aluguel);
        }
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}


//GET: api/aluguel/listar
[HttpGet]
[Route("listar")]
public IActionResult ListarAlugueis()
{
    try
    {
        var alugueis = _ctx.Alugueis
            .Include(a => a.Cliente) 
            .Include(a => a.Quarto) 
            .ToList();

        return Ok(alugueis);
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}


[HttpDelete]
[Route("checkout/{id}")]
public IActionResult Checkout([FromRoute] int id)
{
    try
    {
        var aluguel = _ctx.Alugueis.Find(id);
        if (aluguel == null)
        {
            return NotFound("Aluguel não encontrado.");
        }

        var quarto = _ctx.Quartos.Find(aluguel.QuartoId);

        if (quarto == null)
        {
            return NotFound("Quarto não encontrado.");
        }

        quarto.Status = "Disponível";
        _ctx.Alugueis.Remove(aluguel);
        _ctx.SaveChanges();

         return Ok(new { message = "Check Out realizado com sucesso!" });
    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}


[HttpPut]
[Route("trocarquarto/{id}")]
public IActionResult TrocarQuarto([FromRoute] int id, [FromBody] Aluguel aluguelModificado)
{
    try
    {
        var aluguel = _ctx.Alugueis.Find(id);
        if (aluguel == null)
        {
            return NotFound("Aluguel não encontrado.");
        }

        var quartoAntigo = _ctx.Quartos.Find(aluguel.QuartoId);

        if (quartoAntigo == null)
        {
            return NotFound("Quarto antigo não encontrado.");
        }
        quartoAntigo.Status = "Disponível";

        var novoQuarto = _ctx.Quartos.Find(aluguelModificado.QuartoId);
        if (novoQuarto == null || novoQuarto.Status != "Disponível")
        {
            return BadRequest("O novo quarto é inválido ou indisponível.");
        }

        novoQuarto.Status = "Indisponível";
        aluguel.QuartoId = aluguelModificado.QuartoId;

        if (aluguel.Dias != aluguelModificado.Dias)
        {
            aluguel.Dias = aluguelModificado.Dias;
            double valorTotal = novoQuarto.Diaria * aluguel.Dias;
            aluguel.ValorTotal = valorTotal;
        }

        _ctx.SaveChanges();

        return Ok(new { message = "Troca de quarto concluída com sucesso." });

    }
    catch (Exception e)
    {
        return BadRequest(e.Message);
    }
}
   [HttpGet]
    [Route("buscar/{id}")]
    public IActionResult Buscar([FromRoute] int id)
    {
        try
        {
            Aluguel? aluguelCadastrado = _ctx.Alugueis
                .Include(a => a.Cliente) 
                .Include(a => a.Quarto) 
                .FirstOrDefault(x => x.AluguelId == id);

            if (aluguelCadastrado != null)
            {
                return Ok(aluguelCadastrado);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    
}