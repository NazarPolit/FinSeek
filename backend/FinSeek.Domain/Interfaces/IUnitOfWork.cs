using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface IUnitOfWork : IDisposable
	{
		IStockRepository Stocks { get; }

		Task<int> CompleteAsync();
	}
}
