using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Stocks.Queries.GetStockHealth
{
	public class GetStockHealthQueryHandler : IRequestHandler<GetStockHealthQuery, StockHealthVm>
	{
		private readonly IFMPService _fmpService;
		private readonly IAiFundamentalService _aiService;
		private readonly IMemoryCache _cache;

		public GetStockHealthQueryHandler(IFMPService fmpService, IAiFundamentalService aiService, IMemoryCache cache)
		{
			_fmpService = fmpService;
			_aiService = aiService;
			_cache = cache;
		}

		public async Task<StockHealthVm> Handle(GetStockHealthQuery request, CancellationToken cancellationToken)
		{
			var cacheKey = $"Health_{request.Symbol}";

			if (!_cache.TryGetValue(cacheKey, out StockHealthVm healthVm))
			{
				var rawMetrics = await _fmpService.GetKeyMetricsAsync(request.Symbol);

				if (string.IsNullOrEmpty(rawMetrics) || rawMetrics == "[]") return null;

				var aiResponseJson = await _aiService.AnalyzeHealthAsync(request.Symbol, rawMetrics);

				if (string.IsNullOrEmpty(aiResponseJson)) return null;

				healthVm = JsonConvert.DeserializeObject<StockHealthVm>(aiResponseJson);

				var cacheEntryOptions = new MemoryCacheEntryOptions()
					.SetAbsoluteExpiration(TimeSpan.FromHours(4));

				_cache.Set(cacheKey, healthVm, cacheEntryOptions);
			}

			return healthVm;
		}
	}
}