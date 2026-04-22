using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Comments.Commands
{
	public class CreatePortfolioCommand : IRequest<AddPortfolioResult>
	{
		public string Symbol { get; set; }
		public string Username { get; set; }

		public CreatePortfolioCommand(string symbol, string username)
		{
			Symbol = symbol;
			Username = username;
		}
	}
}
