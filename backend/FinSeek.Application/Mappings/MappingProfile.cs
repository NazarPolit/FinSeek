using AutoMapper;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Mappings
{
	public class MappingProfile : Profile
	{
		public MappingProfile() 
		{
			CreateMap<Stock, StockDTO>();
		}
	}
}
