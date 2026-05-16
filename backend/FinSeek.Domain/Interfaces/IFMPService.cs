using FinSeek.Application.DTOs.FMP;
using FinSeek.Application.DTOs.Market;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Interfaces
{
	public interface IFMPService
	{
		Task<Stock> FindStockBySymbolAsync(string symbol);
		Task<string> GetKeyMetricsAsync(string symbol);
        Task<List<IndexQuote>> GetMajorIndexesAsync();
        Task<List<MarketMover>> GetTopGainersAsync();
        Task<List<MarketMover>> GetTopLosersAsync();
        Task<List<SectorPerformance>> GetSectorPerformanceAsync();
        Task<List<HistoricalPrice>> GetHistoricalPricesAsync(string symbol, int timeseries = 30);
    }
}
