using FinSeek.Domain.Interfaces;
using Microsoft.Extensions.Configuration;
using Google.GenAI;
using System;
using System.Threading.Tasks;

namespace FinSeek.Infrastructure.Services
{
	public class GeminiFundamentalService : IAiFundamentalService
	{
		private readonly IConfiguration _config;

		public GeminiFundamentalService(IConfiguration config)
		{
			_config = config;
		}

		public async Task<string> AnalyzeHealthAsync(string symbol, string metricsJson)
		{
			try
			{
				Environment.SetEnvironmentVariable("GOOGLE_API_KEY", _config["GeminiKey"]);
				var client = new Client();

				var prompt = $@"
                You are a friendly financial mentor. 
                Here are the key financial metrics for the company {symbol} over the last 12 months: {metricsJson}.
                Your task is to analyze these numbers and explain the company's financial health to a BEGINNER.
                Avoid complex jargon. Explain whether the stock is undervalued, overvalued, or fairly valued.
                Respond STRICTLY in JSON format without any additional characters or markdown:
                {{
                    ""status"": ""Undervalued"" or ""Overvalued"" or ""Fair"",
                    ""explanation"": ""Your simple and clear explanation in English in 3-4 sentences.""
                }}";

				var response = await client.Models.GenerateContentAsync(
					model: "gemini-2.5-flash",
					contents: prompt
				);

				var generatedText = response.Candidates[0].Content.Parts[0].Text;
				return generatedText.Replace("```json", "").Replace("```", "").Trim();

			}
			catch (Exception ex)
			{
				Console.WriteLine($"\nEXCEPTION IN GEMINI SDK: {ex.Message}\n");
				return null;
			}
		}
        public async Task<string> GetMarketMoodAsync(string marketDataSummary)
        {
            try
            {
                Environment.SetEnvironmentVariable("GOOGLE_API_KEY", _config["GeminiKey"]);
                var client = new Client();

                var prompt = $@"
                    You are a professional financial analyst. 
                    Here is the current data from the US stock market: {marketDataSummary}.
                    Write ONE short, professional sentence (maximum 20-25 words) in English that summarizes the market mood today. 
                    Do not use greetings. Just provide pure analytics.
                    Example: 'A positive mood dominates the market today driven by the growth of the technology sector, although energy slightly slows down the overall trend.'";

                var response = await client.Models.GenerateContentAsync(
                    model: "gemini-2.5-flash",
                    contents: prompt
                );

                return response.Candidates[0].Content.Parts[0].Text.Trim();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\nEXCEPTION IN GEMINI MARKET MOOD: {ex.Message}\n");
                return "Currently unable to retrieve market analysis from AI.";
            }
        }
        public async Task<List<double>> GetPriceForecastAsync(string symbol, List<double> historicalPrices, int forecastDays)
        {
            try
            {
                Environment.SetEnvironmentVariable("GOOGLE_API_KEY", _config["GeminiKey"]);
                var client = new Client();

                var pricesString = string.Join(", ", historicalPrices.Select(p => Math.Round(p, 2)));

                var prompt = $@"
                    You are an expert financial AI analyst. 
                    Here are the closing prices of {symbol} stock for the last {historicalPrices.Count} days: [{pricesString}].

                    Based on this trend, volatility, and momentum, predict the closing prices for the next {forecastDays} days.

                    CRITICAL RULE: You MUST respond ONLY with a comma-separated list of {forecastDays} numbers. 
                    Do not include any text, explanations, symbols like $, or markdown formatting. 
                    Example of valid response: 150.25, 151.30, 149.80, 152.10, 153.00, 152.50, 154.20";

                var response = await client.Models.GenerateContentAsync(
                    model: "gemini-2.5-flash",
                    contents: prompt
                );

                var aiResponseString = response.Candidates[0].Content.Parts[0].Text.Trim();

                var predictedPrices = aiResponseString
                    .Split(',')
                    .Select(s => s.Trim())
                    .Select(s =>
                    {
                        if (double.TryParse(s, System.Globalization.NumberStyles.Any, System.Globalization.CultureInfo.InvariantCulture, out double val))
                            return val;
                        return 0.0;
                    })
                    .Where(v => v > 0)
                    .ToList();

                if (predictedPrices.Count >= forecastDays)
                {
                    return predictedPrices.Take(forecastDays).ToList();
                }

                throw new Exception($"AI returned invalid format or not enough days. Raw response: {aiResponseString}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"\n[AI FORECAST ERROR]: {ex.Message}\n");
                return new List<double>();
            }
        }
    }
}