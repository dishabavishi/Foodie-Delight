using WebApi.Models;

namespace WebApi.BusinessServices
{
    public class RestaurantBusinessService
    {
        public List<Restaurant> restaurants;

        public RestaurantBusinessService()
        {
            restaurants = new List<Restaurant>();
        }

        public List<Restaurant> GetAll()
        {
            return restaurants;
        }

        public Restaurant Get(Guid id)
        {
            var restaurant = restaurants.FirstOrDefault(x => x.Id == id);
            return restaurant ?? new Restaurant();
        }

        public Restaurant Add(Restaurant restaurant)
        {
            restaurant.Id = Guid.NewGuid();
            restaurants.Add(restaurant);
            return restaurant;
        }

        public void Update(Restaurant restaurant)
        {
            var index = restaurants.FindIndex(x => x.Id == restaurant.Id);
            restaurants[index] = restaurant;
            
        }

        public void Delete(Guid id)
        {
            restaurants.Remove(Get(id));
        }
    }
}
