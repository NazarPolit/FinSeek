using AutoMapper;
using FinSeek.Domain.Interfaces;
using MediatR;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockList
{
	public class GetStockListQueryHandler : IRequestHandler<GetStockListQuery, StockListVm>
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public GetStockListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
		{
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<StockListVm> Handle(GetStockListQuery request, CancellationToken cancellationToken)
		{
			var stocks = await _unitOfWork.Stocks.GetAllWithQueryAsync(request.Query);

			var stockQueryDto = _mapper.Map<List<StockLookupDto>>(stocks);

			return new StockListVm { Stocks = stockQueryDto };
		}
	}
}