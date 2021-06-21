using Eknihy.Backend.Database_Entity.record_classes;
using Microsoft.EntityFrameworkCore;

namespace Eknihy.Backend.Database_Entity.Database
{
    public class DatabaseContext:DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=(localdb)\\EknihyDB;Database=EknihyDB;Trusted_Connection=True;");
            }
        }


        public DatabaseContext(DbContextOptions options) : base(options)
        {
        }

        public DatabaseContext()
        {
        }

        //Tables
        public DbSet<Book> Books { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<PublishingHouse> PublishingHouses { get; set; }
        public DbSet<Author> Authors { get; set; }
    }
}