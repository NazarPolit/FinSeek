using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Commands
{
	public class StockBaseValidator<T> : AbstractValidator<T>
	where T : CreateStockCommand
	{
		public StockBaseValidator()
		{
			RuleFor(x => x.Symbol)
				.NotEmpty().WithMessage("Symbol is required.")
				.MaximumLength(10).WithMessage("Symbol must not exceed 10 characters.");

			RuleFor(x => x.CompanyName)
				.NotEmpty().WithMessage("Company name is required.")
				.MaximumLength(100).WithMessage("Company name must not exceed 100 characters.");

			RuleFor(x => x.Purchase)
				.GreaterThan(0).WithMessage("Purchase price must be greater than 0.");

			RuleFor(x => x.LastDiv)
				.GreaterThanOrEqualTo(0).WithMessage("Last dividend must be greater than or equal to 0.");

			RuleFor(x => x.Industry)
				.NotEmpty().WithMessage("Industry is required.");

			RuleFor(x => x.MarketCap)
				.GreaterThan(0).WithMessage("Market capitalization must be greater than 0.");
		}
	}
}