import React, { useEffect, useState } from "react";
import { getSectorsAPI, SectorPerformance } from "../../api";

const MarketSectors = () => {
  const [sectors, setSectors] = useState<SectorPerformance[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getSectorsAPI()
      .then((data) => {
        setSectors(data || []);
      })
      .catch((err) => console.error("Failed to load sectors:", err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8 h-48 flex justify-center items-center">
        <div className="w-8 h-8 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (sectors.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
      <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-800">Sector Performance</h3>
          <p className="text-sm text-slate-500 mt-1">Track the flow of money across industries today</p>
        </div>
        <div className="p-2 bg-slate-50 rounded-lg">
          <span className="text-2xl">📊</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sectors.map((s) => {
          const isPositive = s.averageChange >= 0;
          const colorClass = isPositive ? "text-green-600" : "text-red-600";
          const bgClass = isPositive ? "bg-green-50" : "bg-red-50";
          const arrow = isPositive ? "↗" : "↘";

          return (
            <div 
              key={s.sector} 
              className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors border border-slate-50 hover:border-slate-200 group"
            >
              <span className="font-semibold text-slate-700 text-sm truncate pr-2 group-hover:text-brandBlue transition-colors">
                {s.sector}
              </span>
              <span className={`font-bold text-sm flex items-center gap-1 px-2.5 py-1 rounded-md ${bgClass} ${colorClass}`}>
                {arrow} {Math.abs(s.averageChange).toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketSectors;