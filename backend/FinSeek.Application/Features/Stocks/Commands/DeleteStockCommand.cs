using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class DeleteStockCommand : IRequest<Unit>
	{
		public int Id { get; set; }
	}
}
