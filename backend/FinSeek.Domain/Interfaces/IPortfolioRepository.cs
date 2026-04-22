using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface IPortfolioRepository : IGenericRepository<Portfolio>
	{
		Task<List<Stock>> GetUserPortfolio(AppUser user);
	}
}
