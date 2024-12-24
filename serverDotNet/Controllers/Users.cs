using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using serverDotNet.Data;
using serverDotNet.Models;

[Route("api/[controller]")]
[ApiController]
public class Users : ControllerBase
{
    private readonly AppDbContext _context;

    public Users(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Test Data Start
    /// </summary>
    /// <returns></returns>
    [HttpGet("test")]
    public IActionResult Test()
    {
        return Ok("UsersController is working!");
    }

    [HttpPost("bulk-upload")]
    public async Task<IActionResult> BulkUploadUsers([FromBody] List<UserDto> users)
    {
        if (users == null || !users.Any())
        {
            return BadRequest("User data is required.");
        }

        var userEntities = new List<UsersModel>();
        var skippedUsers = new List<UserDto>();

        foreach (var user in users)
        {
            // Check if user with the same Id already exists
            var existingUser = await _context.Users.FindAsync(user.Id);

            if (existingUser != null)
            {
                // If the user already exists, skip it
                skippedUsers.Add(user);
                continue;
            }

            // Map UserDto to Users entity
            var userEntity = new UsersModel
            {
                Id = user.Id, // Assuming your Id in the database is an integer
                Name = user.Name,
                Country = user.Country,
                Age = user.Age,
                Rating = user.Rating,
                Sports = user.Sports, // Automatically handled by the HasConversion in DbContext
                ImageUrl = user.ImageUrl
            };

            userEntities.Add(userEntity);
        }

        // Save the list to the database
        if (userEntities.Any())
        {
            _context.Users.AddRange(userEntities);
            await _context.SaveChangesAsync();
        }

        return Ok(new
        {
            Message = $"Successfully uploaded {userEntities.Count} users.",
            SkippedUsers = skippedUsers.Select(u => u.Name) // Optionally return skipped user names
        });
    }

    /// <summary>
    /// Test Data End
    /// </summary>
    /// <returns></returns>

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UsersModel>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UsersModel>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPost]
    public async Task<ActionResult<UsersModel>> PostUser(UsersModel user)
    {
        // Get the last user from the database by Id in descending order
        var lastUser = await _context.Users.OrderByDescending(u => u.Id).FirstOrDefaultAsync();
        user.Id = lastUser?.Id + 1 ?? 1;  // Set ID to lastId + 1, or 1 if no users exist

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // Return the created user
        return CreatedAtAction("GetUser", new { id = user.Id }, user);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutUser(int id, [FromBody] UsersModel user)
    {
        Console.WriteLine("User ID in the route: " + id);
        Console.WriteLine("User ID in the body: " + user.Id);
        // Check if the user ID in the route matches the ID in the URL parameter.
        
        // Check if the model is valid according to any validation annotations.
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Check if the user exists in the database.
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
        {
            return NotFound("User not found.");
        }

        // Update only the fields that are provided in the request body.
        if (!string.IsNullOrEmpty(user.Name))
            existingUser.Name = user.Name;

        if (!string.IsNullOrEmpty(user.Country))
            existingUser.Country = user.Country;

        if (user.Age != null)
            existingUser.Age = user.Age;

        if (user.Rating != null)
            existingUser.Rating = user.Rating;

        if (user.Sports != null && user.Sports.Any())
            existingUser.Sports = user.Sports;

        if (!string.IsNullOrEmpty(user.ImageUrl))
            existingUser.ImageUrl = user.ImageUrl;

        // Ensure the context knows the entity is modified.
        _context.Entry(existingUser).State = EntityState.Modified;

        try
        {
            // Attempt to save changes to the database.
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            // Handle concurrency issues if any.
            if (!UserExists(id))
            {
                return NotFound("User not found.");
            }
            else
            {
                throw;
            }
        }

        // Return a no-content status if the update was successful.
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool UserExists(int id)
    {
        return _context.Users.Any(e => e.Id == id);
    }
}
