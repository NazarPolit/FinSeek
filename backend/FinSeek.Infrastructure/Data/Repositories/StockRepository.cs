using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Data.Repositories
{
	public class StockRepository : GenericRepository<Stock>, IStockRepository
	{
		private readonly ApplicationDbContext _context;
		public StockRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public async Task<List<Stock>> GetAllWithComments()
		{
			return await _context.Stocks.Include(c => c.Comments).ToListAsync();
		}

		public async Task<Stock> GetByIdWithComments(int Id)
		{
			return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == Id);
		}
	}
}
