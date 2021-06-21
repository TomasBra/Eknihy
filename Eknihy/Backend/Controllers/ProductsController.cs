using Eknihy.Backend.Classes;
using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        [HttpPost]
        [Route("products/new")]
        public string NewProduct([FromForm] NewBook Newbook)
        {
            Book book = new Book
            {
                Name = Newbook.Name,
                Authors = new List<Author>(),
                Category = null,
                PublishingHouse = null,
                Price = Newbook.Price,
                Description = Newbook.Description,
                Bestseller = Newbook.Bestseller,
                New = Newbook.New,
                ImageAdress = Newbook.SaveImage(),
                BookAdress = Newbook.SaveBook()
            };
            using (DatabaseContext db = new DatabaseContext())
            {
                //Nalezení category a publishing_house v databázi podle Id
                Category category = db.Categories.First(Category => Category.CategoryId == Newbook.CategoryId);
                PublishingHouse publishing_house = db.PublishingHouses.First(PublishingHouse => PublishingHouse.PublishingHouseId == Newbook.PublishingHouseId);
                //
                book.Category = category;
                book.PublishingHouse = publishing_house;
                //
                foreach (int AuthorId in Newbook.AuthorId)
                {
                    //nalezení autora podle Id v databázi
                    Author author = db.Authors.First(Author => Author.AuthorId == AuthorId);
                    book.Authors.Add(author);
                    //
                    //přidání knihy k autoru
                    author.Books.Add(book);
                    db.Authors.Update(author);
                }
                //
                //
                //přidání knihy ke kategorii
                category.Books.Add(book);
                db.Categories.Update(category);
                //
                //přidání knihy k nakladatelství
                publishing_house.Books.Add(book);
                db.PublishingHouses.Update(publishing_house);
                //
                db.Books.Add(book);
                //
                db.SaveChanges();
            }
            return "Produkt " + book.Name + " byl přidán do databáze.";
        }

        [HttpGet]
        [Route("productss/{BookId}")]
        public string GetProductsByIds(int BookId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Authors.Include(x => x.Books).Select(x => new { x.AuthorId, x.AuthorName, x.Books }).ToList());
                return json;
            }
        }

        [HttpGet]
        [Route("products/{BookId}")]
        public string GetProductsById(int BookId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Where(x => x.Id == BookId).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList());
                return json;
            }
        }

        [HttpGet]
        [Route("products")]
        public string GetProducts()
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList());
                return json;
            }
        }

        [HttpPost]
        [Route("products/count/{ProductCount}")]
        public string GetNumberProducts(int ProductCount, [FromBody] Search Input)
        {
            Console.WriteLine(JsonConvert.SerializeObject(Input));
            using (DatabaseContext db = new DatabaseContext())
            {
                var DefaultData = db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList();
                var data = db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList();

                if (Input.SearchValue != null)
                {
                    data = data.Where(x => Diacritic.RemoveDiacritics(x.Name.ToLower()).Contains(Diacritic.RemoveDiacritics(Input.SearchValue.ToLower()))).ToList();
                    //filtrovaní podle autora
                    DefaultData.ForEach((x) =>
                    {
                        foreach (var author in x.Authors)
                        {
                            if (Diacritic.RemoveDiacritics(author.AuthorName.ToLower()).Contains(Diacritic.RemoveDiacritics(Input.SearchValue.ToLower())))
                            {
                                if (!data.Contains(x))
                                    data.Add(x);
                            }
                        }
                    });
                }
                if (Input.CategoryName != null)
                {
                    data = data.Where(x => x.Category.CategoryName == Input.CategoryName).ToList();
                }
                if (Input.Sorting != null)
                {
                    if (Input.Sorting == "Abecedně")
                    {
                        data = data.OrderBy(item => item.Name).ToList();
                    }
                    else if (Input.Sorting == "Od nejnovějších")
                    {
                        data = data.OrderByDescending(x => x.Id).ToList();
                    }
                    else if (Input.Sorting == "Od nejstarších")
                    {
                        data = data.OrderByDescending(x => x.Id).ToList();
                    }
                    else if (Input.Sorting == "Od nejlevnějších")
                    {
                        data = data.OrderBy(x => x.Price).ToList();
                    }
                    else if (Input.Sorting == "Od nejdražších")
                    {
                        data = data.OrderByDescending(x => x.Price).ToList();
                    }
                }
                else
                {
                    data = data.OrderBy(item => item.Name).ToList();
                }
                string json = JsonConvert.SerializeObject(data.Take(ProductCount).ToList());
                return json;
            }
        }

        [HttpPost]
        [Route("products/edit/{BookId}")]
        public string EditProduct([FromForm] NewBook Newbook, int BookId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                Book book = db.Books.Include(x => x.Category).Include(x => x.Authors).Include(x => x.PublishingHouse).First(Book => Book.Id == BookId);
                //
                //inicializace nových úprav
                book.Name = Newbook.Name;
                book.Price = Newbook.Price;
                book.Description = Newbook.Description;
                book.New = Newbook.New;
                book.Bestseller = Newbook.Bestseller;
                //
                //jestli příchozí objekt nemá v sobě soubory zůstane původní soubor nezměněn
                if (Newbook.ImageFile != null)
                {
                    book.ImageAdress = Newbook.SaveImage();
                }
                if (Newbook.BookFile != null)
                {
                    book.BookAdress = Newbook.SaveBook();
                }
                book.Category.Books.Remove(book);
                book.PublishingHouse.Books.Remove(book);
                //
                //Nalezení category a publishing_house v databázi podle Id
                Category category = db.Categories.First(Category => Category.CategoryId == Newbook.CategoryId);
                PublishingHouse publishing_house = db.PublishingHouses.First(PublishingHouse => PublishingHouse.PublishingHouseId == Newbook.PublishingHouseId);
                //
                book.Category = category;
                book.PublishingHouse = publishing_house;
                //
                foreach (Author author in book.Authors)
                {
                    //odebrání autorů
                    author.Books.Remove(book);
                }
                foreach (int AuthorId in Newbook.AuthorId)
                {
                    //nalezení autora podle Id v databázi
                    Author author = db.Authors.First(Author => Author.AuthorId == AuthorId);
                    book.Authors.Add(author);
                    //
                    //přidání knihy k autoru
                    author.Books.Add(book);
                    db.Authors.Update(author);
                }
                //
                category.Books.Add(book);
                publishing_house.Books.Add(book);
                //
                db.Books.Update(book);
                //
                //
                db.SaveChanges();
                return "Produkt " + book.Name + " byl upraven.";
            }
        }

        [HttpDelete]
        [Route("products/delete")]
        public string DeleteProducts([FromBody] Book book)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Books.Remove(book);
                //
                //Odebrání knihy autoru
                foreach (Author author in book.Authors)
                {
                    Author LocalAuthor = db.Authors.First(Author => Author.AuthorId == author.AuthorId);
                    LocalAuthor.Books.Remove(book);
                    db.Authors.Update(LocalAuthor);
                }
                //
                //Odebrání knihy kategorii
                Category category = db.Categories.First(Category => Category.CategoryId == book.Category.CategoryId);
                category.Books.Remove(book);
                db.Categories.Update(category);
                //
                //Odebrání knihy nakladatelství
                PublishingHouse publishing_house = db.PublishingHouses.First(PublishingHouse => PublishingHouse.PublishingHouseId == book.PublishingHouse.PublishingHouseId);
                publishing_house.Books.Remove(book);
                db.PublishingHouses.Update(publishing_house);
                //
                db.SaveChanges();
                return JsonConvert.SerializeObject(db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList());
            }
        }

        [HttpGet]
        [Route("products/bestsellers/{BookCount}")]
        public string GetBestsellers(int BookCount)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                return JsonConvert.SerializeObject(db.Books.Where(book => book.Bestseller == true).Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).Take(BookCount).ToList());
            }
        }

        [HttpGet]
        [Route("products/news/{BookCount}")]
        public string GetNews(int BookCount)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                return JsonConvert.SerializeObject(db.Books.Where(book => book.New == true).Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).Take(BookCount).ToList());
            }
        }

        [HttpGet]
        [Route("products/random/{BookCount}/{BookId}")]
        public string GetRandomBestsellerBooks(int BookCount, int BookId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                Random rnd = new Random();
                var Books = db.Books.Include(x => x.Authors).Include(x => x.Category).Include(x => x.PublishingHouse).Where(x => x.Bestseller).Where(x=>x.Id!=BookId).Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList();
                Books.ShuffleList();
                Books = Books.Take(BookCount).ToList();
                return (JsonConvert.SerializeObject(Books));
            }
        }
    }
}