using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool confirmed { get; set; }
        public string Role { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();
    }
}