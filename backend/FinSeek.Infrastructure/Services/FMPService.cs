using FinSeek.Application.DTOs.FMP;
using FinSeek.Application.DTOs.Market;
using FinSeek.Application.DTOs.Stock;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using FinSeek.Domain.Models;
using FinSeek.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Services
{
	public class FMPService : IFMPService
	{
		private readonly HttpClient _httpClient;
		private readonly IConfiguration _config;

		public FMPService(HttpClient httpClient, IConfiguration config)
        {
			_httpClient = httpClient;
			_config = config;
		}
        public async Task<Stock> FindStockBySymbolAsync(string symbol)
		{
			try
			{
				var result = await _httpClient.GetAsync(
					$"https://financialmodelingprep.com/stable/profile?symbol={symbol}&apikey={_config["FMPKey"]}"
				);

				if (result.IsSuccessStatusCode)
				{
					var content = await result.Content.ReadAsStringAsync();
					var tasks = JsonConvert.DeserializeObject<FMPStock[]>(content);
					var stock = tasks[0];
					if (stock != null)
					{
						return stock.ToStockFromFmp();
					}
					return null;
				}
				return null;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}
		public async Task<string> GetKeyMetricsAsync(string symbol)
		{
			try
			{
				var result = await _httpClient.GetAsync(
					$"https://financialmodelingprep.com/stable/key-metrics-ttm?symbol={symbol}&apikey={_config["FMPKey"]}"
				);

				if (result.IsSuccessStatusCode)
				{
					return await result.Content.ReadAsStringAsync();
				}
				return null;
			}
			catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
				return null;
			}
		}
        public async Task<List<IndexQuote>> GetMajorIndexesAsync()
        {
            try
            {
                var symbols = new[] { "AAPL", "JPM", "XOM" };

                var tasks = symbols.Select(async symbol =>
                {
                    var url = $"https://financialmodelingprep.com/stable/quote?symbol={symbol}&apikey={_config["FMPKey"]}";
                    var response = await _httpClient.GetAsync(url);

                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        var data = JsonConvert.DeserializeObject<List<IndexQuote>>(content);
                        return data?.FirstOrDefault();
                    }
                    return null;
                });

                var results = await Task.WhenAll(tasks);
                var validIndexes = results.Where(r => r != null).ToList();

                foreach (var item in validIndexes)
                {
                    if (item.Symbol == "AAPL") item.Name = "Apple (Tech)";
                    if (item.Symbol == "JPM") item.Name = "JPMorgan (Finance)";
                    if (item.Symbol == "XOM") item.Name = "ExxonMobil (Energy)";
                }

                return validIndexes;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nFMP INDEX FETCH ERROR: {ex.Message}\n");
                return null;
            }
        }
        public async Task<List<MarketMover>> GetTopGainersAsync()
        {
            try
            {
                var url = $"https://financialmodelingprep.com/stable/biggest-gainers?apikey={_config["FMPKey"]}";
                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<List<MarketMover>>(content);
                    return data?.Take(5).ToList();
                }
                else
                {
                    Console.WriteLine($"\nFMP GAINERS ERROR: {response.StatusCode}\n");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nEXCEPTION: {ex.Message}\n");
                return null;
            }
        }

        public async Task<List<MarketMover>> GetTopLosersAsync()
        {
            try
            {
                var url = $"https://financialmodelingprep.com/stable/biggest-losers?apikey={_config["FMPKey"]}";
                var response = await _httpClient.GetAsync(url);
                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadAsStringAsync();
                    var data = JsonConvert.DeserializeObject<List<MarketMover>>(content);
                    return data?.Take(5).ToList();
                }
                else
                {
                    Console.WriteLine($"\nFMP LOSERS ERROR: {response.StatusCode}\n");
                    return null;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nEXCEPTION: {ex.Message}\n");
                return null;
            }
        }
        public async Task<List<SectorPerformance>> GetSectorPerformanceAsync()
        {
            try
            {
                for (int i = 0; i < 5; i++)
                {
                    var targetDate = DateTime.UtcNow.AddDays(-i).ToString("yyyy-MM-dd");
                    var url = $"https://financialmodelingprep.com/stable/sector-performance-snapshot?date={targetDate}&apikey={_config["FMPKey"]}";

                    var response = await _httpClient.GetAsync(url);
                    if (response.IsSuccessStatusCode)
                    {
                        var content = await response.Content.ReadAsStringAsync();
                        var data = JsonConvert.DeserializeObject<List<SectorPerformance>>(content);

                        if (data != null && data.Count > 0)
                        {
                            return data.OrderByDescending(x => x.AverageChange).ToList();
                        }
                    }
                }
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nFMP SECTORS ERROR: {ex.Message}\n");
                return null;
            }
        }

        public async Task<List<HistoricalPrice>> GetHistoricalPricesAsync(string symbol, int daysBack = 30)
        {
            try
            {
                var toDate = DateTime.UtcNow.ToString("yyyy-MM-dd");
                var fromDate = DateTime.UtcNow.AddDays(-daysBack).ToString("yyyy-MM-dd");

                var endpoint = $"https://financialmodelingprep.com/stable/historical-price-eod/full?symbol={symbol}&from={fromDate}&to={toDate}&apikey={_config["FMPKey"]}";

                var response = await _httpClient.GetAsync(endpoint);

                if (response.IsSuccessStatusCode)
                {
                    var content = await response.Content.ReadFromJsonAsync<List<HistoricalPrice>>();

                    return content ?? new List<HistoricalPrice>();
                }
                else
                {
                    Console.WriteLine($"FMP Historical API Error: HTTP {response.StatusCode}");
                    return new List<HistoricalPrice>();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"FMP Historical Error: {ex.Message}");
                return new List<HistoricalPrice>();
            }
        }
    }
}
