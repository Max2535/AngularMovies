using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MoviesAPI.DTOs;
using MoviesAPI.Entities;
using MoviesAPI.Helpers;

namespace MoviesAPI.Controllers
{
    [Route("api/actors")]
    [ApiController]
    public class ActorsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        private readonly IFileStorageService _fileStorageService;
        private readonly string containerNmae = "actors";

        public ActorsController(ApplicationDbContext context, IMapper mapper, IFileStorageService file)
        {
            _context = context;
            _mapper = mapper;
            _fileStorageService = file;
        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDTO>>> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var queryable = _context.Actors.AsQueryable();
            await HttpContext.InsertParametersPaginationInHeader(queryable);
            var actors = await queryable.OrderBy(x => x.Name).Paginage(paginationDTO).ToListAsync();
            return _mapper.Map<List<ActorDTO>>(actors);
        }

        [HttpGet("{Id:int}")]
        public async Task<ActionResult<ActorDTO>> Get(int Id)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == Id);

            if (actor == null)
            {
                return NotFound();
            }
            return _mapper.Map<ActorDTO>(actor);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = _mapper.Map<Actor>(actorCreationDTO);
            actor.Picture = await _fileStorageService.SaveFile(containerNmae, actorCreationDTO.Picture);
            _context.Add(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreationDTO actorCreationDTO)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == id);

            if (actor == null)
            {
                return NotFound();
            }

            actor = _mapper.Map(actorCreationDTO, actor);

            if (actorCreationDTO.Picture != null)
            {
                actor.Picture = await _fileStorageService.EditFile(containerNmae,
                actorCreationDTO.Picture, actor.Picture);
            }

            await _context.SaveChangesAsync();
            return NoContent();

        }

        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var actor = await _context.Actors.FirstOrDefaultAsync(x => x.Id == Id);

            if (actor == null)
            {
                return NotFound();
            }

            _context.Remove(actor);
            await _context.SaveChangesAsync();

            await _fileStorageService.DeleteFile(actor.Picture, containerNmae);
            return NoContent();
        }

    }
}