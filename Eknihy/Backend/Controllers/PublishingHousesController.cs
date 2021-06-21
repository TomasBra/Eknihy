using Eknihy.Backend.Database_Entity.Database;
using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Linq;

namespace Eknihy.Backend.Controllers
{
    [Route("api")]
    [ApiController]
    public class PublishingHousesController : ControllerBase
    {
        [HttpPost]
        [Route("publishinghouses/new")]
        public string NewPublishingHouse([FromBody] PublishingHouse publishing_house)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.PublishingHouses.Add(publishing_house);
                db.SaveChanges();
            }
            return "Nakladatelství " + publishing_house.Name + " bylo přidáno do databáze";
        }

        [HttpGet]
        [Route("publishinghouses/{PublishingHouseId}")]
        public string GetPublishingHousesById(int PublishingHouseId)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.PublishingHouses.Where(PublishingHouse => PublishingHouse.PublishingHouseId == PublishingHouseId).ToList());
                return json;
            }
        }

        [HttpGet]
        [Route("publishinghouses")]
        public string GetPublishingHouses()
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                string json = JsonConvert.SerializeObject(db.PublishingHouses.ToList());
                return json;
            }
        }

        [HttpPost]
        [Route("publishinghouses/edit")]
        public string EditPublishingHouse([FromBody] PublishingHouse publishing_house)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.PublishingHouses.Update(publishing_house);
                db.SaveChanges();
            }
            return "Nakladatelství " + publishing_house.Name + " bylo upraveno.";
        }

        [HttpDelete]
        [Route("publishinghouses/delete")]
        public string DeletePublishingHouses(PublishingHouse publishing_house)
        {
            using (DatabaseContext db = new DatabaseContext())
            {
                db.PublishingHouses.Remove(publishing_house);
                db.SaveChanges();
                return JsonConvert.SerializeObject(db.PublishingHouses.ToList());
            }
        }

    }
}