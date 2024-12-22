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
    public async Task<ActionResult<UsersModel>> PostPlayer(serverDotNet.Models.UsersModel user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetPlayer", new { id = user.Id }, user);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutPlayer(int id, UsersModel user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PlayerExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePlayer(int id)
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

    private bool PlayerExists(int id)
    {
        return _context.Users.Any(e => e.Id == id);
    }
}
