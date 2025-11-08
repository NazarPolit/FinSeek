using AutoMapper;
using FinSeek.Application.Common.Exceptions;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockComments
{
	public class GetStockCommentsQueryHandler
		: IRequestHandler<GetStockCommentsQuery, StockCommentsVm>
	{
		private readonly IUnitOfWork _unitOfWork;
		private readonly IMapper _mapper;

		public GetStockCommentsQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
			_unitOfWork = unitOfWork;
			_mapper = mapper;
		}

		public async Task<StockCommentsVm> Handle(GetStockCommentsQuery request,
			CancellationToken cancellationToken)
		{
			var entity = await _unitOfWork.Stocks.GetByIdAsync(request.Id);

			if (entity == null)
			{
				throw new NotFoundException(nameof(Stock), request.Id);
			}

			return _mapper.Map<StockCommentsVm>(entity);

		}

	}
}
