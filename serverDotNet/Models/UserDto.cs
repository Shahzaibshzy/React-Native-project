public class UserDto
{
   public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string Age { get; set; } = string.Empty;
    public double Rating { get; set; } = 0.0;
    public List<string> Sports { get; set; } = new List<string>();
    public string ImageUrl { get; set; } = string.Empty;
}
