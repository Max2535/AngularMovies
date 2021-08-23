using System;
using System.Net.Mime;
using System.Collections.Generic;
using MoviesAPI.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using MoviesAPI.Filters;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using MoviesAPI.DTOs;
using AutoMapper;
using System.Linq;

namespace MoviesAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme,Policy = "IsAdmin")]
    public class GenresController : ControllerBase
    {
        private readonly ILogger<GenresController> _logger;

        private readonly ApplicationDbContext _context;

        private readonly IMapper _mapper;

        public GenresController(ILogger<GenresController> logger,
        ApplicationDbContext context,
        IMapper mapper)
        {
            _logger = logger;
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        //[HttpGet("list")]
        //[HttpGet("/allgenrse")]
        //[ResponseCache(Duration = 60)]
        //[ServiceFilter(typeof(MyActionFilter))]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [AllowAnonymous]
        public async Task<ActionResult<List<GenreDTO>>> Get()
        {
            _logger.LogInformation("Getting all the genres");

            var genres = await _context.Genres.OrderBy(x => x.Name).ToListAsync();

            return _mapper.Map<List<GenreDTO>>(genres);
        }


        [HttpGet("{Id:int}", Name = "getGenre")]
        public async Task<ActionResult<GenreDTO>> Get(int Id)
        {
            var genre = await _context.Genres.FirstOrDefaultAsync(x => x.Id == Id);
            if (genre == null)
            {
                return NotFound();
            }

            return _mapper.Map<GenreDTO>(genre);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreationDTO genreCreationDTO)
        {
            var genre = _mapper.Map<Genre>(genreCreationDTO);
            _context.Add(genre);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreationDTO genreCreationDTO)
        {
            /*var genre = _mapper.Map<Genre>(genreCreationDTO);
            genre.Id = id;
            _context.Entry(genre).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();*/

            var genre = await _context.Genres.FirstOrDefaultAsync(x => x.Id == id);

            if (genre == null)
            {
                return NotFound();
            }

            genre = _mapper.Map(genreCreationDTO, genre);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var genre = await _context.Genres.FirstOrDefaultAsync(x => x.Id == Id);

            if (genre == null)
            {
                return NotFound();
            }

            _context.Remove(genre);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}