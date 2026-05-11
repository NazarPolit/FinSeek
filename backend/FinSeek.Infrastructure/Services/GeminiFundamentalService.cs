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

				Console.WriteLine("\n================ GEMINI EXACT PROMPT ================");
				Console.WriteLine(prompt);
				Console.WriteLine("=====================================================\n");

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
	}
}