using FinSeek.Application.Features.Market.Queries.GetMarketMood;
using FinSeek.Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinSeek.API.Controllers
{
    [Route("api/market")]
    [ApiController]
    [Authorize]
    public class MarketController : BaseController
    {
        private readonly IFMPService _fmpService;
        private readonly IAiFundamentalService _aiService;

        public MarketController(IFMPService fmpService, IAiFundamentalService aiService)
        {
            _fmpService = fmpService;
            _aiService = aiService;
        }

        [HttpGet("indexes")]
        public async Task<IActionResult> GetMajorIndexes()
        {
            var indexes = await _fmpService.GetMajorIndexesAsync();

            if (indexes == null || indexes.Count == 0)
            {
                return StatusCode(500, "Could not fetch market indexes");
            }

            return Ok(indexes);
        }

        [HttpGet("gainers")]
        public async Task<IActionResult> GetGainers()
        {
            var gainers = await _fmpService.GetTopGainersAsync();
            return gainers != null ? Ok(gainers) : StatusCode(500, "Could not fetch gainers");
        }

        [HttpGet("losers")]
        public async Task<IActionResult> GetLosers()
        {
            var losers = await _fmpService.GetTopLosersAsync();
            return losers != null ? Ok(losers) : StatusCode(500, "Could not fetch losers");
        }

        [HttpGet("sectors")]
        public async Task<IActionResult> GetSectors()
        {
            var sectors = await _fmpService.GetSectorPerformanceAsync();
            return sectors != null ? Ok(sectors) : StatusCode(500, "Could not fetch sectors");
        }

        [HttpGet("mood")]
        public async Task<IActionResult> GetMarketMood()
        {
            var query = new GetMarketMoodQuery();
            var result = await Mediator.Send(query);

            if (result == null)
            {
                return StatusCode(500, "Could not generate market mood.");
            }

            return Ok(result);
        }
    }
}