namespace WebApi.Models
{
    public class Restaurant
    {
        public Guid? Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string CuisineTypes { get; set; }
        public string ContactNumber { get; set;}
        public string WebsiteURL { get; set;}
    }
}
