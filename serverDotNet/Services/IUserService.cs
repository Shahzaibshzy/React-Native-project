using serverDotNet.Models;

public interface IUserService
{
    Task<IEnumerable<UsersModel>> GetUsersAsync();
    Task<UsersModel?> GetUserByIdAsync(int id);
    Task AddUserAsync(UsersModel user);
    Task UpdateUserAsync(int id, UsersModel user);
    Task DeleteUserAsync(int id);
}