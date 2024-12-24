using serverDotNet.Models;

public interface IUserRepository
{
    Task<IEnumerable<UsersModel>> GetUsersAsync();
    Task<UsersModel?> GetUserByIdAsync(int id);
    Task AddUserAsync(UsersModel user);
    Task UpdateUserAsync(UsersModel user);
    Task DeleteUserAsync(int id);
    Task<bool> UserExistsAsync(int id);
}