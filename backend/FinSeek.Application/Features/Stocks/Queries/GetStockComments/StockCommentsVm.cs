using AutoMapper;
using FinSeek.Application.Common.Mappings;
using FinSeek.Application.Features.Stocks.Queries.GetStockList;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockComments
{
	public class StockCommentsVm : IMapWith<Stock>
	{
		public int Id { get; set; }
		public string Symbol { get; set; } = string.Empty;
		public string CompanyName { get; set; } = string.Empty;
		public decimal Purchase { get; set; }
		public decimal LastDiv { get; set; }
		public string Industry { get; set; } = string.Empty;
		public long MarketCap { get; set; }
		public List<Comment> Comments { get; set; } = new List<Comment>();
		public void Mapping(Profile profile)
		{
			profile.CreateMap<Stock, StockCommentsVm>()
				.ForMember(stockVm => stockVm.Id,
					opt => opt.MapFrom(stock => stock.Id))
				.ForMember(stockVm => stockVm.Symbol,
					opt => opt.MapFrom(note => note.Symbol))
				.ForMember(stockVm => stockVm.CompanyName,
					opt => opt.MapFrom(stock => stock.CompanyName))
				.ForMember(stockVm => stockVm.Purchase,
						opt => opt.MapFrom(stock => stock.Purchase))
				.ForMember(stockVm => stockVm.LastDiv,
						opt => opt.MapFrom(stock => stock.LastDiv))
				.ForMember(stockVm => stockVm.Industry,
						opt => opt.MapFrom(stock => stock.Industry))
				.ForMember(stockVm => stockVm.Comments,
						opt => opt.MapFrom(stock => stock.Comments));
		}

	}
}
