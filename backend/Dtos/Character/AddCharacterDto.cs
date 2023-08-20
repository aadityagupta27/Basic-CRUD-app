using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CRUD.Dtos.Character
{
    public class AddCharacterDto
    {
        public string Name { get; set; } = "aaditya";
        public int Id { get; set; } 
        public RpgClass Class { get; set; } = RpgClass.Knight;
    }
}