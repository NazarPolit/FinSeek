using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class CreateStockCommandHandler
		:IRequestHandler<CreateStockCommand, int>
	{
		private readonly IUnitOfWork _unitOfWork;

		public CreateStockCommandHandler(IUnitOfWork unitOfWork)
        {
			_unitOfWork = unitOfWork;
		}

		public async Task<int> Handle(CreateStockCommand request,
			CancellationToken cancellationToken)
		{
			var stock = new Stock
			{
				Symbol = request.Symbol,
				CompanyName = request.CompanyName,
				Purchase = request.Purchase,
				LastDiv = request.LastDiv,
				Industry = request.Industry,
				MarketCap = request.MarketCap
			};

			_unitOfWork.Stocks.AddAsync(stock);
			_unitOfWork.CompleteAsync();

			return stock.Id;
		}
    }
}
