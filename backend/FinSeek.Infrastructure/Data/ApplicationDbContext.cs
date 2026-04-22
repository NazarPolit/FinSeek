using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FinSeek.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext<AppUser>, IApplicationDbContext
	{
        public ApplicationDbContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions)
        {
        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }

		protected override void OnModelCreating(ModelBuilder builder)
		{
			base.OnModelCreating(builder);

            builder.Entity<Portfolio>(x => x.HasKey(p => new { p.AppUserId, p.StockId }));

            builder.Entity<Portfolio>()
                .HasOne(x => x.AppUser)
                .WithMany(u => u.Portfolios)
                .HasForeignKey(x => x.AppUserId);

			builder.Entity<Portfolio>()
				.HasOne(x => x.Stock)
				.WithMany(u => u.Portfolios)
				.HasForeignKey(x => x.StockId);

			List<IdentityRole> roles = new List<IdentityRole>
            {
                new IdentityRole
                {
                    Name = "Admin",
                    NormalizedName = "ADMIN"
                },
				new IdentityRole
				{
					Name = "User",
					NormalizedName = "USER"
				}
			};
            builder.Entity<IdentityRole>().HasData(roles);
		}

	}
}
