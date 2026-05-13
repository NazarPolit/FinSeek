import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getGainersAPI, getLosersAPI, MarketMover } from "../../api";

const MarketMovers = () => {
  const [gainers, setGainers] = useState<MarketMover[]>([]);
  const [losers, setLosers] = useState<MarketMover[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gainersData = await getGainersAPI();
        const losersData = await getLosersAPI();
        setGainers(gainersData);
        setLosers(losersData);
      } catch (error) {
        console.error("Failed to load market movers", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return null;

  const renderList = (items: MarketMover[], type: "gainers" | "losers") => {
    const isGainer = type === "gainers";
    const title = isGainer ? "Top Gainers" : "Top Losers";
    const colorClass = isGainer ? "text-emerald-600" : "text-rose-600";
    const Icon = isGainer ? (
      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
    ) : (
      <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>
    );

    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex-1">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
          {Icon}
          <h3 className="text-base font-bold text-slate-900">{title}</h3>
        </div>
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item.symbol} className="hover:bg-slate-50 transition-colors">
              <Link to={`/company/${item.symbol}`} className="flex items-center justify-between px-5 py-3">
                <div className="flex flex-col overflow-hidden pr-4">
                  <span className="font-bold text-slate-900 text-sm">{item.symbol}</span>
                  <span className="text-xs font-medium text-slate-500 truncate whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-bold text-slate-900 text-sm">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className={`text-xs font-bold ${colorClass}`}>
                    {isGainer ? "+" : ""}{item.changesPercentage.toFixed(2)}%
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {renderList(gainers, "gainers")}
      {renderList(losers, "losers")}
    </div>
  );
};

export default MarketMovers;