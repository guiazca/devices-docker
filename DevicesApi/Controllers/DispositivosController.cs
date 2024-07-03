using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DevicesApi.Data;
using DevicesApi.DTOs;
using DevicesApi.Models;
using System.Globalization;
using System.Text;
using CsvHelper.Configuration;
using CsvHelper;

namespace DevicesApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DispositivosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DispositivosController(ApplicationDbContext context)
        {
            _context = context;
        }

       [HttpGet]
public async Task<ActionResult<IEnumerable<DispositivoDto>>> GetDispositivos(int page = 1, int pageSize = 10, int? marcaId = null, int? localizacaoId = null, int? categoriaId = null)
{
    var query = _context.Dispositivos
        .Include(d => d.Modelo)
        .ThenInclude(m => m.Marca)
        .Include(d => d.Localizacao)
        .Include(d => d.Categoria)
        .Select(d => new DispositivoDto
        {
            Id = d.Id,
            ModeloId = d.ModeloId,
            ModeloNome = d.Modelo.Nome,
            MarcaId = d.Modelo.MarcaId,
            MarcaNome = d.Modelo.Marca.Nome,
            LocalizacaoId = d.LocalizacaoId,
            LocalizacaoNome = d.Localizacao.Nome,
            CategoriaId = d.CategoriaId,
            CategoriaNome = d.Categoria.Nome,
            Nome = d.Nome,
            IP = d.IP,
            Porta = d.Porta,
            URL = d.URL,
            MacAddress = d.MacAddress,
            Descricao = d.Descricao,
            IsOnline = d.IsOnline // Adiciona IsOnline
        });

    if (marcaId.HasValue)
    {
        query = query.Where(d => d.MarcaId == marcaId.Value);
    }

    if (localizacaoId.HasValue)
    {
        query = query.Where(d => d.LocalizacaoId == localizacaoId.Value);
    }

    if (categoriaId.HasValue)
    {
        query = query.Where(d => d.CategoriaId == categoriaId.Value);
    }

    var totalItems = await query.CountAsync();
    var dispositivos = await query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    var result = new
    {
        TotalItems = totalItems,
        Page = page,
        PageSize = pageSize,
        Items = dispositivos
    };

    return Ok(result);
}

        [HttpGet("{id}")]
        public async Task<ActionResult<DispositivoDto>> GetDispositivo(int id)
        {
            var dispositivo = await _context.Dispositivos
                .Include(d => d.Modelo)
                .ThenInclude(m => m.Marca)
                .Include(d => d.Localizacao)
                .Include(d => d.Categoria)
                .Select(d => new DispositivoDto
                {
                    Id = d.Id,
                    ModeloId = d.ModeloId,
                    ModeloNome = d.Modelo.Nome,
                    MarcaId = d.Modelo.MarcaId,
                    MarcaNome = d.Modelo.Marca.Nome,
                    LocalizacaoId = d.LocalizacaoId,
                    LocalizacaoNome = d.Localizacao.Nome,
                    CategoriaId = d.CategoriaId,
                    CategoriaNome = d.Categoria.Nome,
                    Nome = d.Nome,
                    IP = d.IP,
                    Porta = d.Porta,
                    URL = d.URL,
                    MacAddress = d.MacAddress,
                    Descricao = d.Descricao
                })
                .FirstOrDefaultAsync(d => d.Id == id);

            if (dispositivo == null)
            {
                return NotFound();
            }

            return Ok(dispositivo);
        }

        [HttpPost]
        public async Task<ActionResult<DispositivoDto>> PostDispositivo(DispositivoDto dispositivoDto)
        {
            var dispositivo = new Dispositivo
            {
                ModeloId = dispositivoDto.ModeloId,
                LocalizacaoId = dispositivoDto.LocalizacaoId,
                CategoriaId = dispositivoDto.CategoriaId,
                Nome = dispositivoDto.Nome,
                IP = dispositivoDto.IP,
                Porta = dispositivoDto.Porta,
                URL = dispositivoDto.URL,
                MacAddress = dispositivoDto.MacAddress,
                Descricao = dispositivoDto.Descricao
            };

            _context.Dispositivos.Add(dispositivo);
            await _context.SaveChangesAsync();

            dispositivoDto.Id = dispositivo.Id;

            return CreatedAtAction(nameof(GetDispositivo), new { id = dispositivoDto.Id }, dispositivoDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDispositivo(int id, DispositivoDto dispositivoDto)
        {
            if (id != dispositivoDto.Id)
            {
                return BadRequest();
            }

            var dispositivo = await _context.Dispositivos.FindAsync(id);

            if (dispositivo == null)
            {
                return NotFound();
            }

            dispositivo.ModeloId = dispositivoDto.ModeloId;
            dispositivo.LocalizacaoId = dispositivoDto.LocalizacaoId;
            dispositivo.CategoriaId = dispositivoDto.CategoriaId;
            dispositivo.Nome = dispositivoDto.Nome;
            dispositivo.IP = dispositivoDto.IP;
            dispositivo.Porta = dispositivoDto.Porta;
            dispositivo.URL = dispositivoDto.URL;
            dispositivo.MacAddress = dispositivoDto.MacAddress;
            dispositivo.Descricao = dispositivoDto.Descricao;

            _context.Entry(dispositivo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDispositivo(int id)
        {
            var dispositivo = await _context.Dispositivos.FindAsync(id);

            if (dispositivo == null)
            {
                return NotFound();
            }

            _context.Dispositivos.Remove(dispositivo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [HttpGet("export")]
        public async Task<IActionResult> ExportDispositivos()
        {
            var dispositivos = await _context.Dispositivos
                .Include(d => d.Modelo)
                .ThenInclude(m => m.Marca)
                .Include(d => d.Localizacao)
                .Include(d => d.Categoria)
                .Select(d => new DispositivoDto
                {
                    Id = d.Id,
                    ModeloId = d.ModeloId,
                    ModeloNome = d.Modelo.Nome,
                    MarcaId = d.Modelo.MarcaId,
                    MarcaNome = d.Modelo.Marca.Nome,
                    LocalizacaoId = d.LocalizacaoId,
                    LocalizacaoNome = d.Localizacao.Nome,
                    CategoriaId = d.CategoriaId,
                    CategoriaNome = d.Categoria.Nome,
                    Nome = d.Nome,
                    IP = d.IP,
                    Porta = d.Porta,
                    URL = d.URL,
                    MacAddress = d.MacAddress,
                    Descricao = d.Descricao
                })
                .ToListAsync();

            var csv = GenerateCsv(dispositivos);
            var fileName = $"dispositivos_{DateTime.Now.ToString("yyyyMMddHHmmss", CultureInfo.InvariantCulture)}.csv";
            return File(new UTF8Encoding().GetBytes(csv), "text/csv", fileName);
        }

        private string GenerateCsv(IEnumerable<DispositivoDto> dispositivos)
        {
            var csv = new StringBuilder();
            csv.AppendLine("Id,ModeloId,ModeloNome,MarcaId,MarcaNome,LocalizacaoId,LocalizacaoNome,CategoriaId,CategoriaNome,Nome,IP,Porta,URL,MacAddress,Descricao");

            foreach (var dispositivo in dispositivos)
            {
                csv.AppendLine($"{dispositivo.Id},{dispositivo.ModeloId},{dispositivo.ModeloNome},{dispositivo.MarcaId},{dispositivo.MarcaNome},{dispositivo.LocalizacaoId},{dispositivo.LocalizacaoNome},{dispositivo.CategoriaId},{dispositivo.CategoriaNome},{dispositivo.Nome},{dispositivo.IP},{dispositivo.Porta},{dispositivo.URL},{dispositivo.MacAddress},{dispositivo.Descricao}");
            }

            return csv.ToString();
        }
       [HttpPost("import")]
        public async Task<IActionResult> ImportDispositivos(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("Please upload a valid CSV file.");
            }

            var dispositivos = new List<DispositivoCsvDto>();
            using (var stream = new StreamReader(file.OpenReadStream()))
            {
                var config = new CsvConfiguration(CultureInfo.InvariantCulture)
                {
                    PrepareHeaderForMatch = args => args.Header.ToLower(),
                };
                using (var csv = new CsvReader(stream, config))
                {
                    dispositivos = csv.GetRecords<DispositivoCsvDto>().ToList();
                }
            }

            foreach (var dispositivoDto in dispositivos)
            {
                var categoria = await _context.Categorias
                    .FirstOrDefaultAsync(c => c.Nome == dispositivoDto.CategoriaNome);
                if (categoria == null)
                {
                    categoria = new Categoria { Nome = dispositivoDto.CategoriaNome };
                    _context.Categorias.Add(categoria);
                    await _context.SaveChangesAsync();
                }

                var localizacao = await _context.Localizacoes
                    .FirstOrDefaultAsync(l => l.Nome == dispositivoDto.LocalizacaoNome);
                if (localizacao == null)
                {
                    localizacao = new Localizacao { Nome = dispositivoDto.LocalizacaoNome };
                    _context.Localizacoes.Add(localizacao);
                    await _context.SaveChangesAsync();
                }

                var marca = await _context.Marcas
                    .FirstOrDefaultAsync(m => m.Nome == dispositivoDto.MarcaNome);
                if (marca == null)
                {
                    marca = new Marca { Nome = dispositivoDto.MarcaNome };
                    _context.Marcas.Add(marca);
                    await _context.SaveChangesAsync();
                }

                var modelo = await _context.Modelos
                    .FirstOrDefaultAsync(m => m.Nome == dispositivoDto.ModeloNome && m.MarcaId == marca.Id);
                if (modelo == null)
                {
                    modelo = new Modelo { Nome = dispositivoDto.ModeloNome, MarcaId = marca.Id };
                    _context.Modelos.Add(modelo);
                    await _context.SaveChangesAsync();
                }

                var dispositivo = new Dispositivo
                {
                    Nome = dispositivoDto.Nome,
                    IP = dispositivoDto.IP,
                    Porta = dispositivoDto.Porta,
                    URL = dispositivoDto.URL,
                    MacAddress = dispositivoDto.MacAddress,
                    Descricao = dispositivoDto.Descricao,
                    ModeloId = modelo.Id,
                    LocalizacaoId = localizacao.Id,
                    CategoriaId = categoria.Id
                };

                _context.Dispositivos.Add(dispositivo);
            }

            await _context.SaveChangesAsync();
            return Ok("CSV import completed successfully.");
        }
    }
}
