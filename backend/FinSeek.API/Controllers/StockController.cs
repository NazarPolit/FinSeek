using AutoMapper;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Application.Features.Stocks.Commands;
using FinSeek.Application.Features.Stocks.Queries.GetStockComments;
using FinSeek.Application.Features.Stocks.Queries.GetStockHealth;
using FinSeek.Application.Features.Stocks.Queries.GetStockList;
using FinSeek.Domain.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace FinSeek.API.Controllers
{
	[Route("api/stock")]
	[ApiController]
	public class StockController : BaseController
	{
		private readonly IMapper _mapper;

		public StockController(IMapper mapper)
		{
			_mapper = mapper;
		}

		[HttpGet]
		[Authorize]
		public async Task<ActionResult<StockListVm>> GetAllStocks([FromQuery] QueryObject query)
		{
			var queryGet = new GetStockListQuery { Query = query };

			var vm = await Mediator.Send(queryGet);

			return Ok(vm);
		}

		[HttpGet("{id}")]
		[Authorize]
		public async Task<ActionResult<StockCommentsVm>> GetById(int id)
		{
			var query = new GetStockCommentsQuery
			{
				Id = id
			};

			var vm = await Mediator.Send(query);

			return Ok(vm);
		}

		[HttpPost]
		[Authorize]
		public async Task<ActionResult<int>> CreateStock([FromBody] CreateStockDto createStockDto)
		{
			var command = _mapper.Map<CreateStockCommand>(createStockDto);
			var stockId = await Mediator.Send(command);
			return Ok(stockId);
		}

		[HttpPut("{id}")]
		[Authorize]
		public async Task <IActionResult> UpdateStock([FromRoute] int id, [FromBody] UpdateStockDto updateStockDto)
		{
			var command = _mapper.Map<UpdateStockCommand>(updateStockDto);

			command.Id = id;

			await Mediator.Send(command);

			return NoContent();
		}

		[HttpDelete("{id}")]
		[Authorize]
		public async Task<IActionResult> DeleteStock(int id)
		{
			var command = new DeleteStockCommand
			{
				Id = id
			};

			await Mediator.Send(command);

			return NoContent();
		}

		[HttpGet("{symbol}/health")]
		[Authorize] 
		public async Task<IActionResult> GetStockHealth(string symbol)
		{
			var query = new GetStockHealthQuery { Symbol = symbol };
			var result = await Mediator.Send(query);

			if (result == null)
			{
				return NotFound("Could not analyze fundamental health for this stock.");
			}

			return Ok(result);
		}
	}
}
