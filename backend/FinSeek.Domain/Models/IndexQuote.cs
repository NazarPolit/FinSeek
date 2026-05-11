using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Application.DTOs.Market
{
    public class IndexQuote
    {
        public string Symbol { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public decimal ChangesPercentage { get; set; }
        public decimal Change { get; set; }
    }
}
