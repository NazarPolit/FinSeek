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
        setError("Failed to load market indices.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchIndexes();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white h-32 rounded-xl border border-slate-200"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white text-rose-600 rounded-xl border border-rose-200 text-sm font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {indexes.map((idx) => {
        const isPositive = idx.change >= 0;
        const colorClass = isPositive ? "text-emerald-600" : "text-rose-600";
        
        return (
          <div
            key={idx.symbol}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-bold text-slate-900">{idx.name}</h3>
                <span className="text-xs font-semibold text-slate-500">
                  {idx.symbol.replace("^", "")}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline gap-3">
              <div className="text-2xl font-bold text-slate-900 tracking-tight">
                ${idx.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className={`flex items-center font-semibold text-sm ${colorClass}`}>
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isPositive ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  )}
                </svg>
                <span>{Math.abs(idx.change).toFixed(2)}</span>
                <span className="ml-1 opacity-90">
                  ({isPositive ? "+" : ""}{idx.changesPercentage.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MarketIndexes;