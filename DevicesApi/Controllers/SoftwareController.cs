using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.DTOs;
using DevicesApi.Models;

namespace DevicesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SoftwaresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SoftwaresController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SoftwareDto>>> GetSoftwares()
        {
            var softwares = await _context.Softwares
                .Select(s => new SoftwareDto
                {
                    Id = s.Id,
                    Nome = s.Nome,
                    DataUltimaAtualizacao = s.DataUltimaAtualizacao,
                    IP = s.IP,
                    Porta = s.Porta,
                    URL = s.URL
                })
                .ToListAsync();

            return Ok(softwares);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SoftwareDto>> GetSoftware(int id)
        {
            var software = await _context.Softwares
                .Select(s => new SoftwareDto
                {
                    Id = s.Id,
                    Nome = s.Nome,
                    DataUltimaAtualizacao = s.DataUltimaAtualizacao,
                    IP = s.IP,
                    Porta = s.Porta,
                    URL = s.URL
                })
                .FirstOrDefaultAsync(s => s.Id == id);

            if (software == null)
            {
                return NotFound();
            }

            return Ok(software);
        }

        [HttpPost]
        public async Task<ActionResult<SoftwareDto>> PostSoftware(SoftwareDto softwareDto)
        {
            var software = new Software
            {
                Nome = softwareDto.Nome,
                DataUltimaAtualizacao = softwareDto.DataUltimaAtualizacao?.ToUniversalTime(),
                IP = softwareDto.IP,
                Porta = softwareDto.Porta,
                URL = softwareDto.URL
            };

            _context.Softwares.Add(software);
            await _context.SaveChangesAsync();

            softwareDto.Id = software.Id;

            return CreatedAtAction(nameof(GetSoftware), new { id = softwareDto.Id }, softwareDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutSoftware(int id, SoftwareDto softwareDto)
        {
            if (id != softwareDto.Id)
            {
                return BadRequest();
            }

            var software = await _context.Softwares.FindAsync(id);

            if (software == null)
            {
                return NotFound();
            }

            software.Nome = softwareDto.Nome;
            software.DataUltimaAtualizacao = softwareDto.DataUltimaAtualizacao?.ToUniversalTime();
            software.IP = softwareDto.IP;
            software.Porta = softwareDto.Porta;
            software.URL = softwareDto.URL;

            _context.Entry(software).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSoftware(int id)
        {
            var software = await _context.Softwares.FindAsync(id);

            if (software == null)
            {
                return NotFound();
            }

            _context.Softwares.Remove(software);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
