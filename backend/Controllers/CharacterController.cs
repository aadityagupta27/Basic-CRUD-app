global using CRUD.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;

namespace CRUD.Controllers
{ 
    [ApiController]
    [Route("api/[controller]")]
    public class CharacterController : Controller
    {
        public DataContext context;

        public CharacterController(DataContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public ActionResult<List<Character>> Get()
        {
            // var dbCharacter = await _context.Characters.ToListAsync();
            return Ok(context.Characters.ToList()); // status code 200 means request fine if we use BadRequest then 400 series NotFound - error 404
        }

        [HttpGet("{id}")]
        public ActionResult<Character> GetSingle(int id)
        {
            return Ok(context.Characters.ToList().FirstOrDefault(c => c.ID == id)); 
        }

        [HttpPost]
        public ActionResult<List<Character>> AddCharacter( Character newCharacter)
        {
            context.Characters.Add(newCharacter);
            context.SaveChanges();
            return Ok(context.Characters.ToList());

        }
        [HttpPut]
        public ActionResult<List<Character>> UpdateCharacter( Character updatedCharacter)
        {
            var character = context.Characters.FirstOrDefault(c => c.ID == updatedCharacter.ID);
            character.Name = updatedCharacter.Name;
            character.Class = updatedCharacter.Class;
            context.SaveChanges();
            return Ok(context.Characters.ToList());
        }

        [HttpDelete("{id}")]
        public ActionResult<List<Character>> DeleteCharacter( int id)
        {
            var character = context.Characters.FirstOrDefault(c => c.ID == id);
            context.Characters.Remove(character);
            context.SaveChanges();
            return Ok(context.Characters.ToList());

        }
    }
}