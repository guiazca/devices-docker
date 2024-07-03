using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.DTOs;
using DevicesApi.Models;

namespace DevicesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcasController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MarcasController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<MarcaDto>>> GetMarcas()
        {
            var marcas = await _context.Marcas
                .Select(m => new MarcaDto { Id = m.Id, Nome = m.Nome })
                .ToListAsync();

            return Ok(marcas);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MarcaDto>> GetMarca(int id)
        {
            var marca = await _context.Marcas
                .Select(m => new MarcaDto { Id = m.Id, Nome = m.Nome })
                .FirstOrDefaultAsync(m => m.Id == id);

            if (marca == null)
            {
                return NotFound();
            }

            return Ok(marca);
        }

        [HttpPost]
        public async Task<ActionResult<MarcaDto>> PostMarca(MarcaDto marcaDto)
        {
            var marca = new Marca
            {
                Nome = marcaDto.Nome
            };

            _context.Marcas.Add(marca);
            await _context.SaveChangesAsync();

            marcaDto.Id = marca.Id;

            return CreatedAtAction(nameof(GetMarca), new { id = marcaDto.Id }, marcaDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutMarca(int id, MarcaDto marcaDto)
        {
            if (id != marcaDto.Id)
            {
                return BadRequest();
            }

            var marca = await _context.Marcas.FindAsync(id);

            if (marca == null)
            {
                return NotFound();
            }

            marca.Nome = marcaDto.Nome;

            _context.Entry(marca).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMarca(int id)
        {
            var marca = await _context.Marcas.FindAsync(id);

            if (marca == null)
            {
                return NotFound();
            }

            _context.Marcas.Remove(marca);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
