using FinSeek.Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Portfolios.Queries
{
	public class GetUserPortfolioQuery : IRequest<List<Stock>>
	{
		public string Username { get; set; }

		public GetUserPortfolioQuery(string username)
		{
			Username = username;
		}
	}
}
