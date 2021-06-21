using Eknihy.Backend.Classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Net.Mail;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class ContanctController : ControllerBase
    {
        [HttpPost]
        [Route("contact/email")]
        public string SendEmail([FromBody] Contact contact)
        {
            Console.Write(contact.Email);
            string to = "support@myreader.cz";
            string from = "support@myreader.cz";
            MailMessage message = new MailMessage(from, to);
            message.Subject = "Contact Form From Myreader";
            message.Body = "Email: " + contact.Email + " Telefoní číslo: " + contact.Telephone + " Zpráva: " + contact.Message;
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
                return JsonConvert.SerializeObject("Potvrzocaí email nemohl být odeslán");
            }
            return JsonConvert.SerializeObject("Zpráva byla odeslána.");
        }
    }
}