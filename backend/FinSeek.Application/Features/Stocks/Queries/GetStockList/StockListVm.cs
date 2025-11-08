using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockList
{
	public class StockListVm
	{
		public IList<StockLookupDto> Stocks { get; set; }
	}
}
