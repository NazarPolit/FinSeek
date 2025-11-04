using FinSeek.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Data.Repositories
{
	public class UnitOfWork : IUnitOfWork
	{
		private readonly ApplicationDbContext _context;

		public IStockRepository Stocks { get; private set; }

		public UnitOfWork(ApplicationDbContext context)
		{
			_context = context;
			Stocks = new StockRepository(_context);
		}

		public void Dispose()
		{
			_context.Dispose();
		}

		public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();
	}
}
