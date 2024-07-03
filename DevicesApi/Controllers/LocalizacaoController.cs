using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.DTOs;
using DevicesApi.Models;

namespace DevicesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocalizacoesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LocalizacoesController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<LocalizacaoDto>>> GetLocalizacoes()
        {
            var localizacoes = await _context.Localizacoes
                .Select(l => new LocalizacaoDto { Id = l.Id, Nome = l.Nome })
                .ToListAsync();

            return Ok(localizacoes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LocalizacaoDto>> GetLocalizacao(int id)
        {
            var localizacao = await _context.Localizacoes
                .Select(l => new LocalizacaoDto { Id = l.Id, Nome = l.Nome })
                .FirstOrDefaultAsync(l => l.Id == id);

            if (localizacao == null)
            {
                return NotFound();
            }

            return Ok(localizacao);
        }

        [HttpPost]
        public async Task<ActionResult<LocalizacaoDto>> PostLocalizacao(LocalizacaoDto localizacaoDto)
        {
            var localizacao = new Localizacao
            {
                Nome = localizacaoDto.Nome
            };

            _context.Localizacoes.Add(localizacao);
            await _context.SaveChangesAsync();

            localizacaoDto.Id = localizacao.Id;

            return CreatedAtAction(nameof(GetLocalizacao), new { id = localizacaoDto.Id }, localizacaoDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocalizacao(int id, LocalizacaoDto localizacaoDto)
        {
            if (id != localizacaoDto.Id)
            {
                return BadRequest();
            }

            var localizacao = await _context.Localizacoes.FindAsync(id);

            if (localizacao == null)
            {
                return NotFound();
            }

            localizacao.Nome = localizacaoDto.Nome;

            _context.Entry(localizacao).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocalizacao(int id)
        {
            var localizacao = await _context.Localizacoes.FindAsync(id);

            if (localizacao == null)
            {
                return NotFound();
            }

            _context.Localizacoes.Remove(localizacao);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
