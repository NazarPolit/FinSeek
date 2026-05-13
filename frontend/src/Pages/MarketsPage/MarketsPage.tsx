import React from "react";
import MarketIndexes from "../../Components/Market/MarketIndexes";
import MarketMovers from "../../Components/MarketMovers/MarketMovers";
import AiMarketMood from "../../Components/Market/AiMarketMood";
import MarketSectors from "../../Components/Market/MarketSectors";

const MarketsPage = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 pb-12">
      <div className="bg-brandBlue py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Market Overview
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-blue-100">
            Global market pulse and AI-driven sentiment analysis.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 z-10 relative space-y-6">
        <AiMarketMood />
        <MarketIndexes />
        <MarketSectors />
        <MarketMovers />
      </div>
    </div>
  );
};

export default MarketsPage;