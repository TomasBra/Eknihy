using Eknihy.Backend.Classes;
using Eknihy.Backend.Database_Entity.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Linq;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        [HttpPost]
        [Route("orders/count/{OrdersCount}")]
        public string GetOrders(int OrdersCount, [FromBody] Search Input)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                var DefaultData = db.Orders.Include(x=>x.User).Include(x=>x.Books).ToList();
                var data = db.Orders.Include(x => x.User).Include(x => x.Books).ToList();

                if (Input.SearchValue != null)
                {
                    data = data.Where(x => Diacritic.RemoveDiacritics(x.User.Email.ToLower()).Contains(Diacritic.RemoveDiacritics(Input.SearchValue.ToLower()))).ToList();
                    data.Union(DefaultData.Where(x => x.OrderId.ToString().Contains(Input.SearchValue)));
                }
                string json = JsonConvert.SerializeObject(data.Take(OrdersCount).ToList());
                return json;
            }
        }

        [HttpPost]
        [Route("orders/{UserId}/count/{OrdersCount}")]
        public string GetOrder(int UserId,int OrdersCount, [FromBody] Search Input)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                var DefaultData = db.Orders.Include(x => x.User).Include(x => x.Books).Where(x=>x.User.UserId==UserId).ToList();
                var data = db.Orders.Include(x => x.User).Include(x => x.Books).Where(x => x.User.UserId == UserId).ToList();

                if (Input.SearchValue != null)
                {
                    data=DefaultData.Where(x => x.OrderId.ToString().Contains(Input.SearchValue)).ToList();
                }

                string json = JsonConvert.SerializeObject(data.Take(OrdersCount).ToList());
                return json;
            }
        }

    }
}