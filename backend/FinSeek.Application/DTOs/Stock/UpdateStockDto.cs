using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Features.Stocks.Commands;

namespace FinSeek.Application.DTOs.Stock
{
	public class UpdateStockDto : IMapWith<UpdateStockCommand>
	{
		public string Symbol { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public decimal Purchase { get; set; }
		public decimal LastDiv { get; set; }
		public string Industry { get; set; } = string.Empty;
		public long MarketCap { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<UpdateStockDto, UpdateStockCommand>()
				.ForMember(stockCommand => stockCommand.Id, opt => opt.Ignore())
				.ForMember(stockCommand => stockCommand.Symbol, opt => opt.MapFrom(stockDto => stockDto.Symbol))
				.ForMember(stockCommand => stockCommand.CompanyName, opt => opt.MapFrom(stockDto => stockDto.CompanyName))
				.ForMember(stockCommand => stockCommand.Purchase, opt => opt.MapFrom(stockDto => stockDto.Purchase))
				.ForMember(stockCommand => stockCommand.LastDiv, opt => opt.MapFrom(stockDto => stockDto.LastDiv))
				.ForMember(stockCommand => stockCommand.Industry, opt => opt.MapFrom(stockDto => stockDto.Industry))
				.ForMember(stockCommand => stockCommand.MarketCap, opt => opt.MapFrom(stockDto => stockDto.MarketCap));
		}
	}
}