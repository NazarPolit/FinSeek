using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.DTOs.FMP
{
    public class FmpHistoricalResponse
    {
        public string Symbol { get; set; }
        public List<HistoricalPrice> Historical { get; set; } = new();
    }

    public class HistoricalPrice
    {
        public string Date { get; set; }
        public decimal Close { get; set; }
    }
}
