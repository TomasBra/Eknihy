using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public User User { get; set; }
        [Required]
        public List<Book> Books { get; set; } = new List<Book>();
        [Required]
        public float Price { get; set; }
        [Required]
        public string Status { get; set; }
    }
}