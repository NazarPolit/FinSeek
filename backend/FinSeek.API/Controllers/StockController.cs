using AutoMapper;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Application.Interfaces;
using FinSeek.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
	[Route("api/stock")]
	[ApiController]
	public class StockController : ControllerBase
	{
		private readonly IStockService _stockService;

		public StockController(IStockService stockService)
		{
			_stockService = stockService;
		}

		[HttpGet]
		public async Task<IActionResult> GetAllStocks()
		{
			var stocks = await _stockService.GetAllStocksAsync();

			return Ok(stocks);
		}

		[HttpGet("{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var stock = await _stockService.GetStockByIdAsync(id);

			if (stock == null)
			{
				return NotFound();
			}

			return Ok(stock);
		}
    }
}
