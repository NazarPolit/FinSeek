using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface IAiFundamentalService
	{
		Task<string> AnalyzeHealthAsync(string symbol, string metricsJson);
        Task<string> GetMarketMoodAsync(string marketDataSummary);
        Task<List<double>> GetPriceForecastAsync(string symbol, List<double> historicalPrices, int forecastDays);
    }
}
