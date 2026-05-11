using FinSeek.Application.DTOs.Stock;
using FinSeek.Domain.Entities;
using FinSeek.Domain.Interfaces;
using FinSeek.Infrastructure.Extensions;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
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
					$"https://financialmodelingprep.com/stable/key-metrics?symbol={symbol}&apikey={_config["FMPKey"]}"
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
	}
}
