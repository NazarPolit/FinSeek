using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class CreateStockCommand: IRequest<int>
	{
		public string Symbol { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public decimal Purchase { get; set; }
		public decimal LastDiv { get; set; }
		public string Industry { get; set; } = string.Empty;
		public long MarketCap { get; set; }
	}
}
