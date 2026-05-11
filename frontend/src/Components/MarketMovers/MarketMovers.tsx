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

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-brandBlue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const renderList = (items: MarketMover[], type: "gainers" | "losers") => {
    const isGainer = type === "gainers";
    const colorClass = isGainer ? "text-green-600" : "text-red-600";
    const bgClass = isGainer ? "bg-green-50" : "bg-red-50";

    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex-1">
        <div className={`px-6 py-4 border-b border-slate-100 ${bgClass}`}>
          <h3 className={`text-lg font-bold ${colorClass}`}>
            {isGainer ? "🔥 Top Gainers" : "📉 Top Losers"}
          </h3>
        </div>
        <ul className="divide-y divide-slate-100">
          {items.map((item) => (
            <li key={item.symbol} className="hover:bg-slate-50 transition-colors">
              <Link to={`/company/${item.symbol}`} className="flex items-center justify-between px-6 py-4">
                <div className="flex flex-col overflow-hidden pr-4">
                  <span className="font-bold text-slate-900">{item.symbol}</span>
                  <span className="text-sm text-slate-500 truncate whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className="font-bold text-slate-800">
                    ${item.price.toFixed(2)}
                  </span>
                  <span className={`text-sm font-semibold ${colorClass}`}>
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
    <div className="flex flex-col lg:flex-row gap-6 mt-8">
      {renderList(gainers, "gainers")}
      {renderList(losers, "losers")}
    </div>
  );
};

export default MarketMovers;