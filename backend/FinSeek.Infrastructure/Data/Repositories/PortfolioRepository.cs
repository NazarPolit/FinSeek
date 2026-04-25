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
	public class PortfolioRepository : GenericRepository<Portfolio>, IPortfolioRepository
	{
		private readonly ApplicationDbContext _context;

		public PortfolioRepository(ApplicationDbContext context) : base(context)
		{
			_context = context;
		}

		public async Task<List<Stock>> GetUserPortfolio(AppUser user)
		{
			return await _context.Portfolios.Where(u => u.AppUserId == user.Id)
				.Select(stock => new Stock
				{
					Id = stock.StockId,
					Symbol = stock.Stock.Symbol,
					CompanyName = stock.Stock.CompanyName,
					Purchase = stock.Stock.Purchase,
					LastDiv = stock.Stock.LastDiv,
					Industry = stock.Stock.Industry,
					MarketCap = stock.Stock.MarketCap
				}).ToListAsync();
		}

		public async Task<Portfolio?> GetPortfolioAsync(string appUserId, string symbol)
		{
			return await _context.Portfolios
				.FirstOrDefaultAsync(p => p.AppUserId == appUserId &&
										  p.Stock.Symbol.ToLower() == symbol.ToLower());
		}
	}
}
