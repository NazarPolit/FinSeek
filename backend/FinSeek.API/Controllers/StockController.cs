using AutoMapper;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
	[Route("api/stock")]
	[ApiController]
	public class StockController : ControllerBase
	{
		private readonly ApplicationDbContext _context;
		private readonly IMapper _mapper;

		public StockController(ApplicationDbContext context, IMapper mapper)
		{
			_context = context;
			_mapper = mapper;
		}

		[HttpGet]
		public IActionResult GetAll()
		{
			var stocks = _context.Stocks.ToList();

			var stocksDto = _mapper.Map<List<StockDTO>>(stocks);

			return Ok(stocksDto);
		}

		[HttpGet("{id}")]
		public IActionResult Get(int id)
		{
			var stock = _context.Stocks.Find(id);

			return Ok(stock);
		}
    }
}
