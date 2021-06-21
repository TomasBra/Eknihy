using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthorsController : ControllerBase
    {
        [HttpGet]
        [Route("authors")]
        public string GetAuthors()
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Authors.ToList());
                return json;
            }
        }

        [HttpGet]
        [Route("authors/{Authorid}")]
        public string GetAuthorsById(int AuthorId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Authors.Where(Author => Author.AuthorId == AuthorId).ToList());
                return json;
            }

        }

        [HttpPost]
        [Route("authors/new")]
        public string NewAuthor([FromBody] Author author)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Authors.Add(author);
                db.SaveChanges();
            }
            return "Autor " + author.AuthorName + " byl přidán do databáze.";
        }

        [HttpPost]
        [Route("authors/edit")]
        public string EditAuthor([FromBody] Author author)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Authors.Update(author);
                db.SaveChanges();
            }
            return "Autor " + author.AuthorName + " byl upraven.";
        }

        [HttpDelete]
        [Route("authors/delete")]
        public string DeleteCategory([FromBody] Author author)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Authors.Remove(author);
                db.SaveChanges();
                return JsonConvert.SerializeObject(db.Authors.ToList());
            }
        }
    }
}