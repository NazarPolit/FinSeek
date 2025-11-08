using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockComments
{
	public class GetStockCommentsQuery : IRequest<StockCommentsVm>
	{
		public int Id { get; set; }
	}
}
