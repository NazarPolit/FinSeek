using FinSeek.Application.Common.Exceptions;
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
	public class UpdateStockCommandHandler 
		:IRequestHandler<UpdateStockCommand, Unit>
	{
		private readonly IUnitOfWork _unitOfWork;
        public UpdateStockCommandHandler(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(UpdateStockCommand request, 
			CancellationToken cancellationToken)
		{
			var entity = await _unitOfWork.Stocks.GetByIdAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Stock), request.Id);
			}

			entity.Symbol = request.Symbol;
			entity.CompanyName = request.CompanyName;
			entity.Purchase = request.Purchase;
			entity.LastDiv = request.LastDiv;
			entity.Industry = request.Industry;
			entity.MarketCap = request.MarketCap;

			await _unitOfWork.CompleteAsync();

			return Unit.Value;
		}
	}
}
