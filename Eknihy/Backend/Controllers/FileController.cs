using Microsoft.AspNetCore.Mvc;

namespace Eknihy.Backend.Controllers
{
    [ApiController]
    public class FileController : ControllerBase
    {
        [Route("Books/Products/{id}")]
        [HttpGet]
        public ActionResult GetBook([FromRoute] string id)
        {
            string localFilePath;

            localFilePath = @$"frontend/build/Books/Products/{id}";

            return File(System.IO.File.OpenRead(localFilePath), "application/epub+zip");
        }
    }
}