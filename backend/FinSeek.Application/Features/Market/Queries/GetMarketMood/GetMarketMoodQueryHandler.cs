using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Features.Market.Queries.GetMarketMood
{
    public class GetMarketMoodQueryHandler : IRequestHandler<GetMarketMoodQuery, MarketMoodVm>
    {
        private readonly IFMPService _fmpService;
        private readonly IAiFundamentalService _aiService;
        private readonly IMemoryCache _cache;

        public GetMarketMoodQueryHandler(IFMPService fmpService, IAiFundamentalService aiService, IMemoryCache cache)
        {
            _fmpService = fmpService;
            _aiService = aiService;
            _cache = cache;
        }

        public async Task<MarketMoodVm> Handle(GetMarketMoodQuery request, CancellationToken cancellationToken)
        {
            var cacheKey = "MarketMood_Current";

            if (!_cache.TryGetValue(cacheKey, out MarketMoodVm moodVm))
            {
                var indexes = await _fmpService.GetMajorIndexesAsync();
                var sectors = await _fmpService.GetSectorPerformanceAsync();

                if (indexes == null || sectors == null) return null;

                var indexesText = string.Join(", ", indexes.Select(i => $"{i.Name}: {i.ChangesPercentage}%"));
                var topSectors = string.Join(", ", sectors.Take(2).Select(s => $"{s.Sector} ({s.AverageChange:F2}%)"));
                var summary = $"Indexes: {indexesText}. Leading sectors: {topSectors}.";

                var aiResponse = await _aiService.GetMarketMoodAsync(summary);

                if (string.IsNullOrEmpty(aiResponse)) return null;

                moodVm = new MarketMoodVm { Mood = aiResponse };

                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetAbsoluteExpiration(TimeSpan.FromMinutes(30));

                _cache.Set(cacheKey, moodVm, cacheEntryOptions);
            }

            return moodVm;
        }
    }
}
