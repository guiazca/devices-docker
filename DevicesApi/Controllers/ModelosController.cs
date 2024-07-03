using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.DTOs;
using DevicesApi.Models;

namespace DevicesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ModelosController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ModeloDto>>> GetModelos()
        {
            var modelos = await _context.Modelos
                .Include(m => m.Marca)
                .Select(m => new ModeloDto
                {
                    Id = m.Id,
                    Nome = m.Nome,
                    MarcaId = m.MarcaId,
                    MarcaNome = m.Marca.Nome
                })
                .ToListAsync();

            return Ok(modelos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModeloDto>> GetModelo(int id)
        {
            var modelo = await _context.Modelos
                .Include(m => m.Marca)
                .Select(m => new ModeloDto
                {
                    Id = m.Id,
                    Nome = m.Nome,
                    MarcaId = m.MarcaId,
                    MarcaNome = m.Marca.Nome
                })
                .FirstOrDefaultAsync(m => m.Id == id);

            if (modelo == null)
            {
                return NotFound();
            }

            return Ok(modelo);
        }

        [HttpPost]
        public async Task<ActionResult<ModeloDto>> PostModelo(ModeloDto modeloDto)
        {
            var modelo = new Modelo
            {
                Nome = modeloDto.Nome,
                MarcaId = modeloDto.MarcaId
            };

            _context.Modelos.Add(modelo);
            await _context.SaveChangesAsync();

            modeloDto.Id = modelo.Id;

            return CreatedAtAction(nameof(GetModelo), new { id = modeloDto.Id }, modeloDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutModelo(int id, ModeloDto modeloDto)
        {
            if (id != modeloDto.Id)
            {
                return BadRequest();
            }

            var modelo = await _context.Modelos.FindAsync(id);

            if (modelo == null)
            {
                return NotFound();
            }

            modelo.Nome = modeloDto.Nome;
            modelo.MarcaId = modeloDto.MarcaId;

            _context.Entry(modelo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteModelo(int id)
        {
            var modelo = await _context.Modelos.FindAsync(id);

            if (modelo == null)
            {
                return NotFound();
            }

            _context.Modelos.Remove(modelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("{brandId}/modelos")]
        public IActionResult GetModelosByBrand(int brandId)
        {
            var modelos = _context.Modelos.Where(m => m.MarcaId == brandId).ToList();
            return Ok(modelos);
        }
    }
}
