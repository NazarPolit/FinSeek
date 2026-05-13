import React, { useEffect, useState } from "react";
import { getSectorsAPI, SectorPerformance } from "../../api";

const MarketSectors = () => {
  const [sectors, setSectors] = useState<SectorPerformance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getSectorsAPI()
      .then((data) => setSectors(data || []))
      .catch((err) => console.error("Failed to load sectors:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return null;
  if (sectors.length === 0) return null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Sector Performance</h3>
          <p className="text-sm text-slate-500 font-medium">Daily flow across industries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
        {sectors.map((s) => {
          const isPositive = s.averageChange >= 0;
          const colorClass = isPositive ? "text-emerald-600" : "text-rose-600";

          return (
            <div 
              key={s.sector} 
              className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0"
            >
              <span className="font-semibold text-slate-700 text-sm truncate pr-3">
                {s.sector}
              </span>
              <span className={`font-bold text-sm text-right ${colorClass}`}>
                {isPositive ? "+" : ""}{s.averageChange.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSectors;