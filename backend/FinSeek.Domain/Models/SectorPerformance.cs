using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinSeek.Domain.Models
{
    public class SectorPerformance
    {
        public string Date { get; set; }
        public string Sector { get; set; }
        public decimal AverageChange { get; set; }
    }
}
