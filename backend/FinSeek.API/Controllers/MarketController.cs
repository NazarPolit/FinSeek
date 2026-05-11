using FinSeek.Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinSeek.API.Controllers
{
    [Route("api/market")]
    [ApiController]
    [Authorize]
    public class MarketController : ControllerBase
    {
        private readonly IFMPService _fmpService;

        public MarketController(IFMPService fmpService)
        {
            _fmpService = fmpService;
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
    }
}