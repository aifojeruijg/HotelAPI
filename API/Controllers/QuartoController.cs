using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/quarto")]
public class QuartoController : ControllerBase
{
    private readonly AppDataContext _ctx;
    public QuartoController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    //POST: api/quarto/cadastrar
    [HttpPost]
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Quarto quarto)
    {
        try
        {
            _ctx.Quartos.Add(quarto);
            _ctx.SaveChanges();
            return Created("", quarto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET api/quarto/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Quarto> quartos = _ctx.Quartos.ToList();
            return quartos.Count == 0 ? NotFound() : Ok(quartos);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //DELETE api/quarto/deletar
    [HttpDelete]
    [Route("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try
        {
            Quarto? quartoCadastrado = _ctx.Quartos.Find(id);
            if (quartoCadastrado != null)
            {
                _ctx.Quartos.Remove(quartoCadastrado);
                _ctx.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //PUT api/quarto/alterar
    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id,
        [FromBody] Quarto quarto)
    {
        try
        {
            Quarto? quartoCadastrado =
                _ctx.Quartos.FirstOrDefault(x => x.QuartoId ==id);
            if (quartoCadastrado != null)
            {
                quartoCadastrado.TipoQuarto = quarto.TipoQuarto;
                quartoCadastrado.Diaria = quarto.Diaria;
                quartoCadastrado.NumeroQuarto = quarto.NumeroQuarto;
                _ctx.Quartos.Update(quartoCadastrado);
                _ctx.SaveChanges();
                return Ok();
            }
            return NotFound();
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
            Quarto? quartoCadastrado = _ctx.Quartos.FirstOrDefault(x => x.QuartoId == id);
            if (quartoCadastrado != null)
            {
                return Ok(quartoCadastrado);
            }
            return NotFound();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}