using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Data.Repositories
{
	public class StockRepository : GenericRepository<Stock>, IStockRepository
	{
		public StockRepository(ApplicationDbContext context) : base(context)
		{
		}
	}
}
