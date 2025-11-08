using FinSeek.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Interfaces
{
	public interface IApplicationDbContext
	{
		DbSet<Stock> Stocks { get; set; }
		public DbSet<Comment> Comments { get; set; }
		Task<int> SaveChangesAsync(CancellationToken cancellationToken);
	}
}
