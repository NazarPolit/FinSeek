using FinSeek.Application.DTOs.Prediction;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.Interfaces
{
    public interface IPredictionService
    {
        Task<List<PredictionDto>> GetPricePredictionsAsync(string symbol, int historicalDays = 14, int forecastDays = 7);
    }
}
