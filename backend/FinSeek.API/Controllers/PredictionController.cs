using FinSeek.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FinSeek.API.Controllers
{
    [Route("api/prediction")]
    [ApiController]
    public class PredictionController : ControllerBase
    {
        private readonly IPredictionService _predictionService;

        public PredictionController(IPredictionService predictionService)
        {
            _predictionService = predictionService;
        }

        [HttpGet("{symbol}")]
        public async Task<IActionResult> GetPricePrediction(string symbol)
        {
            try
            {
                var predictions = await _predictionService.GetPricePredictionsAsync(symbol, 14, 7);
                return Ok(predictions);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Prediction Controller Error: {ex.Message}");
                return StatusCode(500, "Failed to generate prediction");
            }
        }
    }
}