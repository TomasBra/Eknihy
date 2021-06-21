using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        [Route("categories")]
        public string GetCategories()
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Categories.ToList());
                return json;
            }
        }

        [HttpGet]
        [Route("categories/{CategoryId}")]
        public string GetCategoriesById(int CategoryId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Categories.Where(Category=>Category.CategoryId==CategoryId).ToList());
                return json;
            }
        }

        [HttpPost]
        [Route("categories/edit")]
        public string EditCategory([FromBody] Category category)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Categories.Update(category);
                db.SaveChanges();
            }
            return "Kategorie " + category.CategoryName + " byla upravena.";
        }

        [HttpPost]
        [Route("categories/new")]
        public string NewCategories([FromBody] Category category)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Categories.Add(category);
                db.SaveChanges();
            }
            return "Kategorie " + category.CategoryName + " byla přidána do databáze.";
        }

        [HttpDelete]
        [Route("categories/delete")]
        public string DeleteCategory([FromBody] Category category)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Categories.Remove(category);
                db.SaveChanges();
                return JsonConvert.SerializeObject(db.Categories.ToList());
            }
        }
    }
}