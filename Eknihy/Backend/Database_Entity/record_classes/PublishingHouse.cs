using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class PublishingHouse
    {
        [Key]
        public int PublishingHouseId { get; set; }
        [Required]
        public string Name { get; set; }
        public List<Book> Books { get; set; } = new List<Book>();
    }
}