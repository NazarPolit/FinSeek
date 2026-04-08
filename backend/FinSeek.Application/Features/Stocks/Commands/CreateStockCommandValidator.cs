using FinSeek.Domain.Interfaces;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class CreateStockCommandValidator : StockBaseValidator<CreateStockCommand>
	{
		private readonly IUnitOfWork _unitOfWork;

		public CreateStockCommandValidator(IUnitOfWork unitOfWork)
		{
			_unitOfWork = unitOfWork;

			RuleFor(x => x.Symbol)
				.MustAsync(BeUniqueSymbol)
				.WithMessage("Symbol must be unique.");
		}

		private async Task<bool> BeUniqueSymbol(string symbol, CancellationToken ct)
		{
			var stock = await _unitOfWork.Stocks.GetBySymbolAsync(symbol);
			return stock == null;
		}
	}
}