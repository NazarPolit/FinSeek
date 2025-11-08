using AutoMapper;
using FinSeek.Application.Features.Stocks.Queries.GetStockComments;
using FinSeek.Application.Features.Stocks.Queries.GetStockList;
using FinSeek.Application.Interfaces;
using FinSeek.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

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
		public async Task<ActionResult<StockListVm>> GetAllStocks()
		{
			var query = new GetStockListQuery();

			var vm = await Mediator.Send(query);

			return Ok(vm);
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<StockCommentsVm>> GetById(int id)
		{
			var query = new GetStockCommentsQuery
			{
				Id = id
			};

			var vm = await Mediator.Send(query);

			return Ok(vm);
		}
    }
}
