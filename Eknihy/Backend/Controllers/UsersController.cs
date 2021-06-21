using Eknihy.Backend.Classes;
using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text.Json;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class UsersController : ControllerBase
    {


        [Route("users/login")]
        [HttpPost]
        public string LoginUser(User user)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDB = db.Users.First(x => x.Email == user.Email);
                if (UserInDB == null)
                {
                    return (JsonConvert.SerializeObject("Uživatel neexistuje."));
                }
                else if (UserInDB.confirmed == false)
                {
                    return (JsonConvert.SerializeObject("Účet není aktivován."));
                }
                else if (UserInDB.Password != HashEncryption.ComputeSha256Hash(user.Password))
                {
                    return (JsonConvert.SerializeObject("Zadáno nesprávné heslo nebo email."));
                }
                else if (UserInDB.Password == HashEncryption.ComputeSha256Hash(user.Password))
                {
                    return (JsonConvert.SerializeObject(UserInDB));
                }
            }
            return (JsonConvert.SerializeObject("Error chyba na serveru."));
        }

        [Route("users/edit/{UserId}")]
        [HttpPost]
        public string EditUser(int UserId, User user)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDB = db.Users.First(x => x.UserId == UserId);
                if (UserInDB == null)
                {
                    return (JsonConvert.SerializeObject("Uživatel neexistuje."));
                }
                else if (UserInDB.confirmed == false)
                {
                    return (JsonConvert.SerializeObject("Účet není aktivován."));
                }
                else if (UserInDB != null)
                {
                    UserInDB.FirstName = user.FirstName;
                    UserInDB.LastName = user.LastName;
                    if (user.Role != null)
                    {
                        UserInDB.Role = user.Role;
                    }
                    if (user.Password != null)
                    {
                        UserInDB.Password = HashEncryption.ComputeSha256Hash(user.Password);
                    }
                    db.Users.Update(UserInDB);
                    db.SaveChanges();
                    return (JsonConvert.SerializeObject(new { user=UserInDB, text="Změny byly uloženy do databáze." }));
                }
            }
            return (JsonConvert.SerializeObject("Error chyba na serveru."));
        }

        [Route("users/books/{ProductCount}")]
        [HttpPost]
        public string GetUsersBooks(int ProductCount, [FromBody] JsonElement Ddata)
        {
            Search Input = JsonConvert.DeserializeObject<Search>(Ddata.GetProperty("Input").ToString());
            User user = JsonConvert.DeserializeObject<User>(Ddata.GetProperty("User").ToString());

            using (DatabaseContext db = new DatabaseContext())
            {
                var DefaultData = db.Users.Include(x => x.Books).ThenInclude(x => x.Category).Include(x => x.Books).ThenInclude(x => x.PublishingHouse).Include(x => x.Books).ThenInclude(x => x.Authors).First(x => x.UserId == user.UserId).Books.Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList();
                var data = db.Users.Include(x => x.Books).ThenInclude(x => x.Category).Include(x => x.Books).ThenInclude(x => x.PublishingHouse).Include(x => x.Books).ThenInclude(x => x.Authors).First(x => x.UserId == user.UserId).Books.Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList();

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
                string json = JsonConvert.SerializeObject(data.Select(x => new { x.Id, x.Name, x.Price, x.Description, x.Bestseller, x.Category, x.ImageAdress, x.New, x.BookAdress, x.Authors, x.PublishingHouse }).ToList().Take(ProductCount), new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return json;
            }
        }

        [Route("users/check")]
        [HttpPost]
        public string CheckUser(User user)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDB = db.Users.First(x => x.Email == user.Email);
                if (UserInDB == null)
                {
                    return (JsonConvert.SerializeObject("Uživatel neexistuje."));
                }
                else if (UserInDB.confirmed == false)
                {
                    return (JsonConvert.SerializeObject("Účet není aktivován."));
                }
                else if (UserInDB.Password != user.Password)
                {
                    return (JsonConvert.SerializeObject("Zadáno nesprávné heslo nebo email."));
                }
                else if (UserInDB.Password == user.Password)
                {
                    return (JsonConvert.SerializeObject(UserInDB));
                }
            }
            return (JsonConvert.SerializeObject("Error chyba na serveru."));
        }

        [Route("users/register")]
        [HttpPost]
        public string RegisterNewUser([FromBody] User user)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                if (db.Users.Any(x => x.Email == user.Email))
                {
                    return (JsonConvert.SerializeObject("Email je již přiřazen k jinému účtu"));
                }
                else
                {
                    user.confirmed = false;
                    if (user.Role == null)
                    {
                        user.Role = "User";
                    }
                    user.Password = HashEncryption.ComputeSha256Hash(user.Password);
                    //
                    db.Users.Add(user);
                    db.SaveChanges();
                }
                string to = user.Email;
                string from = "support@myreader.cz";
                MailMessage message = new MailMessage(from, to);
                message.Subject = "Potvrzovací email";
                message.Body = @"Pro povtrzení Vašeho účtu klikněte na tento odkaz https://" + HttpContext.Request.Host + "/users/confirm/" + db.Users.First(x => x.Email == user.Email).UserId;
                var client = new SmtpClient("smtp.forpsi.com")
                {
                    Credentials = new NetworkCredential("support@myreader.cz", "karate12"),
                    EnableSsl = true
                };

                try
                {
                    client.Send(message);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return JsonConvert.SerializeObject("Potvrzovací email nemohl být odeslán");
                }
            }
            return JsonConvert.SerializeObject("Byl Vám odeslán potvrzovací email");
        }

        [Route("users/confirm/{id}")]
        [HttpGet]
        public string RegistrationConfirmation(int id)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.Users.First(x => x.UserId == id).confirmed = true;
                db.SaveChanges();
            }
            return JsonConvert.SerializeObject("Účet byl aktivován");
        }

        [Route("check/owning/{BookId}")]
        [HttpPost]
        public string CheckOwningOfBook([FromBody] User user, int BookId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDb = db.Users.First(x => x.UserId == user.UserId);
                Book BookInDb = db.Books.First(x => x.Id == BookId);
                Console.WriteLine(UserInDb.Books.Contains(BookInDb));
                return (JsonConvert.SerializeObject(UserInDb.Books.Contains(BookInDb)));
            }
        }

        [Route("users/resetpassword")]
        [HttpPost]
        public string ResetPassword([FromBody]User user)
        {
            string NewPassword = PasswordGenerator.RandomString(10);
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDb = db.Users.First(x => x.Email == user.Email);
                if (UserInDb == null)
                {
                    return JsonConvert.SerializeObject("Účet nebyl v databázi nalezen.");
                }
                UserInDb.Password =  HashEncryption.ComputeSha256Hash(NewPassword);
                db.SaveChanges();
                //
                string to = UserInDb.Email;
                string from = "support@myreader.cz";
                MailMessage message = new MailMessage(from, to);
                message.Subject = "Nové heslo";
                message.Body = @"Nové heslo k Vašemu účtu na stránce " + HttpContext.Request.Host + " je: "+ NewPassword;
                var client = new SmtpClient("smtp.forpsi.com")
                {
                    Credentials = new NetworkCredential("support@myreader.cz", "karate12"),
                    EnableSsl = true
                };

                try
                {
                    client.Send(message);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e);
                    return JsonConvert.SerializeObject("Email s nový heslem nemohl být odeslán.");
                }
            }
            return ("Nové heslo bylo odesláno na Vámi zadaný email.");
        }

        [Route("users/count/{ProductCount}")]
        [HttpPost]
        public string GetUsers(int ProductCount,[FromBody] Search Input)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                var DefaultData = db.Users.ToList();
                var data = db.Users.ToList();

                if (Input.SearchValue != null)
                {
                    data = data.Where(x => Diacritic.RemoveDiacritics(x.Email.ToLower()).Contains(Diacritic.RemoveDiacritics(Input.SearchValue.ToLower()))).ToList();

                    data = data.Union(DefaultData.Where(x => Diacritic.RemoveDiacritics(x.UserId.ToString()).Contains(Diacritic.RemoveDiacritics(Input.SearchValue.ToLower()))).ToList()).ToList();
                }
                string json = JsonConvert.SerializeObject(data.Take(ProductCount));
                return json;
            }
        }

        [Route("users/delete/{count}")]
        [HttpPost]
        public string DeleteUser(int count,[FromBody] User user)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDb = db.Users.Include(x => x.Books).First(x => x.UserId == user.UserId);
                db.Orders.Where(x => x.User.UserId == user.UserId).ToList().ForEach(order =>
                {
                    db.Orders.Remove(order);
                });
                db.Remove(UserInDb);
                db.SaveChanges();

                return (JsonConvert.SerializeObject(db.Users.Take(count).ToList()));
            }
        }

        [Route("users/{Id}")]
        [HttpGet]
        public string GetUser(int Id)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                User UserInDb = db.Users.First(x => x.UserId == Id);

                return (JsonConvert.SerializeObject(UserInDb));
            }
        }
    }
}