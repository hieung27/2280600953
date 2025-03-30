using Microsoft.EntityFrameworkCore;
using _2280600953.Models;

namespace _2280600953
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        // Other DbSets for other entities
    }
}
