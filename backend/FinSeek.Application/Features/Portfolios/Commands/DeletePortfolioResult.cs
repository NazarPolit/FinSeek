using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Portfolios.Commands
{
	public class DeletePortfolioResult
	{
		public bool IsSuccess { get; set; }
		public string? ErrorMessage { get; set; }
		public int StatusCode { get; set; } = 400;
	}
}
