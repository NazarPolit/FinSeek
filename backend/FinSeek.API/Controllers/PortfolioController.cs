using FinSeek.Application.Extensions;
using FinSeek.Application.Features.Portfolios.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class PortfolioController : BaseController
	{
		public PortfolioController() {}

		[HttpGet]
		[Authorize]
		public async Task<IActionResult> GetUserPortfolio()
		{
			var username = User.GetUsername();

			var query = new GetUserPortfolioQuery(username);

			var userPortfolio = await Mediator.Send(query);

			return Ok(userPortfolio);
		}
	}
}
