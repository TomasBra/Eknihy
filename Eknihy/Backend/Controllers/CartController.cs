using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class CartController : ControllerBase
    {
        [Route("checkout")]
        [HttpPost]
        public string CheckoutOrder([FromBody] JsonElement data)
        {
            List<Book> Books = JsonConvert.DeserializeObject<List<Book>>(data.GetProperty("Products").ToString());
            User user = JsonConvert.DeserializeObject<User>(data.GetProperty("User").ToString());
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDb = db.Users.First(x => x.UserId == user.UserId);
                List<Book> BooksInDb = new List<Book>();
                float BooksPrice = 0;
                //
                Books.ForEach(book =>
                {
                    Book BookInDb = db.Books.First(x => x.Id == book.Id);
                    UserInDb.Books.Add(BookInDb);
                    BooksInDb.Add(BookInDb);
                    BooksPrice += book.Price;
                });
                //
                //
                Order order = new Order
                {
                    Books = BooksInDb,
                    Date = DateTime.Now.ToString("dd/MM/yyyy"),
                    Price = BooksPrice,
                    Status = "Completed",
                    User = UserInDb
                };
                //
                db.Orders.Add(order);
                db.SaveChanges();
            }
            return ("Knihy byly přidány na Váš účet");
        }




    }
}