using FinSeek.Domain.Entities;
using FinSeek.Domain.Helpers;
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

		public async Task<List<Stock?>> GetAllWithQueryAsync(QueryObject query)
		{
			var stocks = _context.Stocks.Include(c => c.Comments).AsQueryable();

			if(!string.IsNullOrEmpty(query.CompanyName))
			{
				stocks = stocks.Where(s => s.CompanyName.Contains(query.CompanyName));
			}

			if (!string.IsNullOrEmpty(query.Symbol))
			{
				stocks = stocks.Where(s => s.Symbol.Contains(query.Symbol));
			}
			
			return await stocks.ToListAsync();
		}

		public async Task<Stock> GetByIdWithComments(int Id)
		{
			return await _context.Stocks.Include(c => c.Comments).FirstOrDefaultAsync(i => i.Id == Id);
		}

		public async Task<Stock?> GetBySymbolAsync(string symbol)
		{
			return await _context.Stocks
				.AsNoTracking()
				.FirstOrDefaultAsync(x => x.Symbol == symbol);
		}
	}
}
