using WebApi.BusinessServices;
using WebApi.Models;
using Xunit;

namespace WebApi.UnitTests;
public class RestaurantBusinessServiceTests
{
    private readonly RestaurantBusinessService service;

    public RestaurantBusinessServiceTests()
    {
        service = new RestaurantBusinessService();
    }

    [Fact]
    public void GetAll_ShouldReturnAllRestaurants()
    {
        // Arrange
        var restaurant1 = new Restaurant { Id = Guid.NewGuid(), Name = "Restaurant1" };
        var restaurant2 = new Restaurant { Id = Guid.NewGuid(), Name = "Restaurant2" };

        service.Add(restaurant1);
        service.Add(restaurant2);

        // Act
        var result = service.GetAll();

        // Assert
        Assert.Contains(restaurant1, result);
        Assert.Contains(restaurant2, result);
    }

    [Fact]
    public void Get_ShouldReturnRestaurantById()
    {
        // Arrange
        var restaurant = new Restaurant { Id = Guid.NewGuid(), Name = "Restaurant" };
        service.Add(restaurant);

        // Act
        var result = service.Get(restaurant.Id.Value);

        // Assert
        Assert.Equal(restaurant, result);
    }

    [Fact]
    public void Get_ShouldReturnNewRestaurantIfNotFound()
    {
        // Act
        var exception = Assert.Throws<BadHttpRequestException>(() => service.Get(Guid.NewGuid()));

        // Assert
        Assert.Equal("Restaurant with given Id not found.", exception.Message);
    }

    [Fact]
    public void Add_ShouldAddRestaurantAndReturnIt()
    {
        // Arrange
        var restaurant = new Restaurant { Name = "Restaurant" };

        // Act
        var result = service.Add(restaurant);

        // Assert
        Assert.NotEqual(Guid.Empty, result.Id);
        Assert.Contains(result, service.GetAll());
    }

    [Fact]
    public void Update_ShouldUpdateExistingRestaurant()
    {
        // Arrange
        var restaurant = new Restaurant { Id = Guid.NewGuid(), Name = "Restaurant" };
        service.Add(restaurant);
        var updatedRestaurant = new Restaurant { Id = restaurant.Id, Name = "Updated Restaurant" };

        // Act
        service.Update(updatedRestaurant);

        // Assert
        var result = service.Get(restaurant.Id.Value);
        Assert.Equal("Updated Restaurant", result.Name);
    }

    [Fact]
    public void Delete_ShouldRemoveRestaurant()
    {
        // Arrange
        var restaurant = new Restaurant { Id = Guid.NewGuid(), Name = "Restaurant" };
        service.Add(restaurant);

        // Act
        service.Delete(restaurant.Id.Value);

        // Assert
        Assert.DoesNotContain(restaurant, service.GetAll());
    }
}

