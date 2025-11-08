using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockList
{
	public class StockLookupDto : IMapWith<Stock>
	{
		public int Id { get; set; }
		public string Symbol { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public decimal Purchase { get; set; }
		public decimal LastDiv { get; set; }
		public string Industry { get; set; } = string.Empty;
		public long MarketCap { get; set; }

		public void Mapping(Profile profile)
		{
			profile.CreateMap<Stock, StockLookupDto>()
				.ForMember(stockDto => stockDto.Id,
					opt => opt.MapFrom(stock => stock.Id))
				.ForMember(stockDto => stockDto.Symbol,
					opt => opt.MapFrom(note => note.Symbol))
				.ForMember(stockDto => stockDto.CompanyName,
					opt => opt.MapFrom(stock => stock.CompanyName)) 
				.ForMember(stockDto => stockDto.Purchase,
						opt => opt.MapFrom(stock => stock.Purchase)) 
				.ForMember(stockDto => stockDto.LastDiv,
						opt => opt.MapFrom(stock => stock.LastDiv))
				.ForMember(stockDto => stockDto.Industry,
						opt => opt.MapFrom(stock => stock.Industry)) 
				.ForMember(stockDto => stockDto.MarketCap,
						opt => opt.MapFrom(stock => stock.MarketCap)); 
		}
	}

}
