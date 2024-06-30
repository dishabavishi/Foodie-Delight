using Microsoft.AspNetCore.Mvc;
using WebApi.Filters;

namespace WebApi.Controllers
{
    [Route("api")]
    [ApiController]
    [ServiceFilter(typeof(ExceptionFilter))]
    public class BaseController : ControllerBase
    {
    }
}
