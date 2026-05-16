using FinSeek.Application.DTOs.Prediction;
using FinSeek.Application.Interfaces;
using FinSeek.Domain.Interfaces;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Services
{
    public class PredictionService : IPredictionService
    {
        private readonly IFMPService _fmpService;
        private readonly IAiFundamentalService _aiService;
        private readonly IMemoryCache _cache;

        public PredictionService(IFMPService fmpService, IAiFundamentalService aiService, IMemoryCache cache)
        {
            _fmpService = fmpService;
            _aiService = aiService;
            _cache = cache;
        }

        public async Task<List<PredictionDto>> GetPricePredictionsAsync(string symbol, int historicalDays = 14, int forecastDays = 7)
        {
            string cacheKey = $"prediction_{symbol.ToUpper()}";

            if (_cache.TryGetValue(cacheKey, out List<PredictionDto> cachedPredictions))
            {
                return cachedPredictions;
            }

            var results = new List<PredictionDto>();

            var history = await _fmpService.GetHistoricalPricesAsync(symbol, historicalDays);
            if (history == null || !history.Any()) return results;
            history.Reverse();

            foreach (var h in history)
            {
                results.Add(new PredictionDto
                {
                    Date = DateTime.Parse(h.Date).ToString("MMM dd"),
                    Actual = Math.Round(h.Close, 2)
                });
            }

            var closes = history.Select(h => (double)h.Close).ToList();
            int n = closes.Count;

            // Лінійна регресія
            double sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
            for (int i = 0; i < n; i++)
            {
                sumX += i; sumY += closes[i]; sumXY += i * closes[i]; sumX2 += i * i;
            }
            double slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
            double intercept = (sumY - slope * sumX) / n;

            // EMA
            double k = 2.0 / (n + 1);
            double emaCurrent = closes.First();
            foreach (var price in closes.Skip(1))
            {
                emaCurrent = (price * k) + (emaCurrent * (1 - k));
            }

            // ШІ Прогноз
            var aiForecast = await _aiService.GetPriceForecastAsync(symbol, closes, forecastDays);

            var todayNode = results.Last();
            double currentPrice = closes.Last();
            todayNode.Linear = (decimal)currentPrice;
            todayNode.Ema = (decimal)currentPrice;
            todayNode.Ai = (decimal)currentPrice;

            DateTime lastDate = DateTime.Parse(history.Last().Date);

            for (int i = 1; i <= forecastDays; i++)
            {
                double linearPred = (slope * (n - 1 + i)) + intercept;
                emaCurrent = (linearPred * k) + (emaCurrent * (1 - k));
                double aiPred = (aiForecast != null && aiForecast.Count >= i) ? aiForecast[i - 1] : emaCurrent;

                results.Add(new PredictionDto
                {
                    Date = lastDate.AddDays(i).ToString("MMM dd"),
                    Actual = null,
                    Linear = (decimal)Math.Round(linearPred, 2),
                    Ema = (decimal)Math.Round(emaCurrent, 2),
                    Ai = (decimal)Math.Round(aiPred, 2)
                });
            }

            var cacheEntryOptions = new MemoryCacheEntryOptions()
                .SetAbsoluteExpiration(TimeSpan.FromHours(12));

            _cache.Set(cacheKey, results, cacheEntryOptions);

            return results;
        }
    }
}