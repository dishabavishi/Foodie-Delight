using Microsoft.AspNetCore.Mvc;
using WebApi.BusinessServices;
using WebApi.Models;

namespace WebApi.Controllers
{
    [Route("restaurant")]
    public class RestaurantApiController(RestaurantBusinessService restaurantBusinessService): BaseController
    {
        [HttpGet]
        [Route("{id}")]
        public Restaurant Get(Guid id)
        {
            return restaurantBusinessService.Get(id);
        }

        [HttpGet]
        [Route("")]
        public List<Restaurant> GetRestaurants()
        {
            return restaurantBusinessService.GetAll();
        }

        [HttpPost]
        [Route("")]
        public Restaurant Add(Restaurant restaurant)
        {
            return restaurantBusinessService.Add(restaurant);
        }

        [HttpPut]
        [Route("{id}")]
        public void Update(Restaurant restaurant)
        {
            restaurantBusinessService.Update(restaurant);
        }

        [HttpDelete]
        [Route("{id}")]
        public void Delete(Guid id)
        {
            restaurantBusinessService.Delete(id);
        }
    }
}
