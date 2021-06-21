using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.IO;

namespace Eknihy.Backend.Classes
{
    public class NewBook
    {
        public string Name { get; set; }
        public List<int> AuthorId { get; set; }
        public int CategoryId { get; set; }
        public int PublishingHouseId { get; set; }
        public float Price { get; set; }
        public string Description { get; set; }
        public bool Bestseller { get; set; }
        public bool New { get; set; }
        public IFormFile ImageFile { get; set; }
        public IFormFile BookFile { get; set; }

        public string SaveImage()
        {
            int count = Directory.GetFiles("frontend/build/Images/Products/", "*", SearchOption.AllDirectories).Length;
            var Adress = "/Images/Products/Image" + count+"."+ImageFile.FileName.Split('.')[1];
            ImageFile.CopyTo(new FileStream("frontend/build"+Adress, FileMode.Create));
            return Adress;
        }
        public string SaveBook()
        {
            int count = Directory.GetFiles("frontend/build/Books/Products/", "*", SearchOption.AllDirectories).Length;
            var Adress = "/Books/Products/Book" + count + "."+BookFile.FileName.Split('.')[1];
            BookFile.CopyTo(new FileStream("frontend/build" + Adress, FileMode.Create));
            return Adress;
        }
    }
}