using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Eknihy.Backend.Database_Entity.record_classes
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public List<Author> Authors { get; set; } = new List<Author>();
        [Required]
        public Category Category{ get; set; }
        [Required]
        public PublishingHouse PublishingHouse { get; set; }
        [Required]
        public float Price { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public bool Bestseller { get; set; }
        [Required]
        public bool New { get; set; }
        [Required]
        public string ImageAdress { get; set; }
        [Required]
        public string BookAdress { get; set; }

    }
}