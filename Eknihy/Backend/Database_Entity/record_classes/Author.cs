using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class Author
    {
        [Key]
        public int AuthorId { get; set; }
        [Required]
        public string AuthorName { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();

    }
}