using FinSeek.Application.Extensions;
using FinSeek.Application.Features.Comments.Commands;
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
		public PortfolioController() { }

		[HttpGet]
		[Authorize]
		public async Task<IActionResult> GetUserPortfolio()
		{
			var username = User.GetUsername();

			var query = new GetUserPortfolioQuery(username);

			var userPortfolio = await Mediator.Send(query);

			return Ok(userPortfolio);
		}

		[HttpPost]
		[Authorize]
		public async Task<IActionResult> AddPortfolio(string symbol)
		{
			var username = User.GetUsername();

			var command = new CreatePortfolioCommand(symbol, username);
			var result = await Mediator.Send(command);

			if (!result.IsSuccess)
			{
				if (result.StatusCode == 500)
				{
					return StatusCode(500, result.ErrorMessage);
				}

				return BadRequest(result.ErrorMessage);
			}

			return Created();
		}
	}
}
