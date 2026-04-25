using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Portfolios.Commands
{
	public class DeletePortfolioCommand : IRequest<DeletePortfolioResult>
	{
		public string Symbol { get; set; }
		public string Username { get; set; }

		public DeletePortfolioCommand(string symbol, string username)
		{
			Symbol = symbol;
			Username = username;
		}
	}
}
