using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockHealth
{
	public class GetStockHealthQuery : IRequest<StockHealthVm>
	{
		public string Symbol { get; set; }
	}
}
