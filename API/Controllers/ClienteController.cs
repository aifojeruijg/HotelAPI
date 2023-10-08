
using API.Models;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/cliente")]
public class ClienteController : ControllerBase
{
    private readonly AppDataContext _ctx;
    public ClienteController(AppDataContext ctx)
    {
        _ctx = ctx;
    }

    //POST: api/cliente/cadastrar
    [HttpPost] 
    [Route("cadastrar")]
    public IActionResult Cadastrar([FromBody] Cliente cliente)
    {
        try 
        {
            _ctx.Clientes.Add(cliente);
            _ctx.SaveChanges();
            return Created("", cliente);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //GET api/cliente/listar
    [HttpGet]
    [Route("listar")]
    public IActionResult Listar()
    {
        try
        {
            List<Cliente> clientes = _ctx.Clientes.ToList();
            return clientes.Count == 0 ? NotFound() : Ok(clientes);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    //DELETE api/cliente/deletar
    [HttpDelete]
    [Route("deletar/{id}")]
    public IActionResult Deletar([FromRoute] int id)
    {
        try 
        {
            Cliente? clienteCadastrado = _ctx.Clientes.Find(id);
            if (clienteCadastrado != null)
            {
                _ctx.Clientes.Remove(clienteCadastrado);
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

    //PUT api/cliente/alterar
    [HttpPut]
    [Route("alterar/{id}")]
    public IActionResult Alterar([FromRoute] int id,
        [FromBody] Cliente cliente)
        {
            try
            {
                Cliente? clienteCadastrado =
                    _ctx.Clientes.FirstOrDefault(x => x.ClienteId == id);
                if (clienteCadastrado != null)
                {
                    clienteCadastrado.Nome = cliente.Nome;
                    clienteCadastrado.Telefone = cliente.Telefone;
                    clienteCadastrado.CPF = cliente.CPF;
                    _ctx.Clientes.Update(clienteCadastrado);
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
}