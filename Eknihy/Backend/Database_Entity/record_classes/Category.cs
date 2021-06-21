using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class Category
    {
        [Key]
        public int CategoryId { get; set; }
        [Required]
        public string CategoryName { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();

    }
}