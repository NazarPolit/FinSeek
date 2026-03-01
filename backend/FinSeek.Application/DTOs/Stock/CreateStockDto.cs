using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Features.Stocks.Commands;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.DTOs.Stock
{
	public class CreateStockDto : IMapWith<CreateStockCommand>
	{
		public string Symbol { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public decimal Purchase { get; set; }
		public decimal LastDiv { get; set; }
		public string Industry { get; set; } = string.Empty;
		public long MarketCap { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<CreateStockDto, CreateStockCommand>()
				.ForMember(stockCommand => stockCommand.Symbol,
					opt => opt.MapFrom(stockDto => stockDto.Symbol))
				.ForMember(stockCommand => stockCommand.CompanyName,
					opt => opt.MapFrom(stockDto => stockDto.CompanyName))
				.ForMember(stockCommand => stockCommand.Purchase,
					opt => opt.MapFrom(stockDto => stockDto.Purchase))
				.ForMember(stockCommand => stockCommand.LastDiv,
					opt => opt.MapFrom(stockDto => stockDto.LastDiv))
				.ForMember(stockCommand => stockCommand.Industry,
					opt => opt.MapFrom(stockDto => stockDto.Industry))
				.ForMember(stockCommand => stockCommand.MarketCap,
					opt => opt.MapFrom(stockDto => stockDto.MarketCap));
		}
	}
}
