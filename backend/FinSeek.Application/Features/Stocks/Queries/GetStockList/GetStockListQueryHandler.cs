using AutoMapper;
using AutoMapper.QueryableExtensions;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockList
{
    public class GetStockListQueryHandler
        : IRequestHandler<GetStockListQuery, StockListVm>
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public GetStockListQueryHandler(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<StockListVm> Handle(GetStockListQuery request,
            CancellationToken cancellationToken)
        {
            var stocksQuery = await _unitOfWork.Stocks.GetAllAsync();

            var stockQueryDto = stocksQuery
                .AsQueryable()
                .ProjectTo<StockLookupDto>(_mapper.ConfigurationProvider)
                .ToList();

            return new StockListVm { Stocks = stockQueryDto };
        }
    }
}
