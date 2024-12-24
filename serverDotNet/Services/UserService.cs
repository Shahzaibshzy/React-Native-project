using serverDotNet.Models;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<UsersModel>> GetUsersAsync()
    {
        return await _repository.GetUsersAsync();
    }

    public async Task<UsersModel?> GetUserByIdAsync(int id)
    {
        return await _repository.GetUserByIdAsync(id);
    }

    public async Task AddUserAsync(UsersModel user)
    {
        await _repository.AddUserAsync(user);
    }

    public async Task UpdateUserAsync(int id, UsersModel user)
    {
        var existingUser = await _repository.GetUserByIdAsync(id);
        if (existingUser == null) throw new KeyNotFoundException("User not found.");

        // Update fields
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

        await _repository.UpdateUserAsync(existingUser);
    }

    public async Task DeleteUserAsync(int id)
    {
        if (!await _repository.UserExistsAsync(id))
            throw new KeyNotFoundException("User not found.");

        await _repository.DeleteUserAsync(id);
    }
}