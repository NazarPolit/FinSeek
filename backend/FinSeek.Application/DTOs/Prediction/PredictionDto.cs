using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.DTOs.Prediction
{
    public class PredictionDto
    {
        public string Date { get; set; } = string.Empty;
        public decimal? Actual { get; set; }
        public decimal? Linear { get; set; }
        public decimal? Ema { get; set; }
        public decimal? Ai { get; set; }
    }
}
