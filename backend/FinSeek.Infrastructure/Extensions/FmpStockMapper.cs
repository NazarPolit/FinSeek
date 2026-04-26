using FinSeek.Application.DTOs.Stock;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Extensions
{
	public static class FmpStockMapper
	{
		public static Stock ToStockFromFmp(this FMPStock fmpModel)
		{
			return new Stock
			{
				Symbol = fmpModel.symbol,
				CompanyName = fmpModel.companyName ?? "Unknown",
				Purchase = (decimal)fmpModel.price,
				LastDiv = (decimal)fmpModel.lastDividend,
				Industry = fmpModel.industry ?? "Unknown",
				MarketCap = fmpModel.marketCap
			};
		}
	}
}
