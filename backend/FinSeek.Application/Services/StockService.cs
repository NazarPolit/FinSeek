using AutoMapper;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Services
{
	public class StockService : IStockService
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;
		public StockService(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<List<StockDTO>> GetAllStocksAsync()
		{
			var stocks = await _unitOfWork.Stocks.GetAllAsync();
			var stocksDto = _mapper.Map<List<StockDTO>>(stocks);

			return stocksDto;
		}

		public async Task<Stock> GetStockByIdAsync(int id)
		{
			var stock = await _unitOfWork.Stocks.GetByIdAsync(id);

			return stock;
		}
	}
}
