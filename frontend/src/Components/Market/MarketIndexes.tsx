import React, { useEffect, useState } from "react";
import { getMajorIndexesAPI, IndexQuote } from "../../api";

const MarketIndexes = () => {
  const [indexes, setIndexes] = useState<IndexQuote[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIndexes = async () => {
      try {
        const data = await getMajorIndexesAPI();
        setIndexes(data);
      } catch (err) {
        setError("Failed to load market data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndexes();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32 animate-pulse">
        <p className="text-slate-500 font-medium">Завантаження індексів...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {indexes.map((idx) => {
        const isPositive = idx.change >= 0;
        const colorClass = isPositive ? "text-green-600" : "text-red-600";
        const bgClass = isPositive ? "bg-green-50" : "bg-red-50";
        const arrow = isPositive ? "▲" : "▼";

        return (
          <div
            key={idx.symbol}
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-800 text-lg">{idx.name}</h3>
              <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
                {idx.symbol.replace("^", "")}
              </span>
            </div>

            <div className="text-3xl font-extrabold text-slate-900 mb-2">
              ${idx.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>

            <div className={`flex items-center gap-2 font-semibold ${colorClass}`}>
              <span className={`flex items-center justify-center w-6 h-6 rounded-full ${bgClass} text-xs`}>
                {arrow}
              </span>
              <span>
                {isPositive ? "+" : ""}{idx.change.toFixed(2)}
              </span>
              <span className="text-sm">
                ({isPositive ? "+" : ""}{idx.changesPercentage.toFixed(2)}%)
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketIndexes;