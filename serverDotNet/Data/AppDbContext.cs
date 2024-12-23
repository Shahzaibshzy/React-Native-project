using Microsoft.EntityFrameworkCore;
using serverDotNet.Models;

namespace serverDotNet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<UsersModel> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the seeding of data

            modelBuilder.Entity<UsersModel>()
                .Property(u => u.Id)
                .ValueGeneratedOnAdd();

            modelBuilder.Entity<UsersModel>()
                           .Property(u => u.Sports)
                           .HasConversion(
                               v => string.Join(',', v),   // Convert List<string> to string for storage
                               v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList()  // Convert back to List<string>
                           );


            modelBuilder.Entity<UsersModel>().HasData(
                new UsersModel
                {
                    Id = 1,
                    Name = "John Parker",
                    Country = "Canada",
                    Age = "21-30 Years old",
                    Rating = 3,
                    Sports = new List<string> { "Football", "Baseball", "Basketball", "Soccer" },
                    ImageUrl = "https://bootdey.com/img/Content/avatar/avatar1.png"
                }

            );
        }
    }
}
