using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface IStockRepository : IGenericRepository<Stock>
	{
		Task<List<Stock>> GetAllWithComments();
		Task<Stock> GetByIdWithComments(int Id);
		Task<Stock?> GetBySymbolAsync(string symbol);

	}
}
