import React from "react";
import MarketIndexes from "../../Components/Market/MarketIndexes";

type Props = {};

const MarketsPage = (props: Props) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      <div className="bg-brandBlue py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            Market Overview
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-blue-100">
            Get the latest pulse of the global stock market.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 pb-12 z-10 relative">
        <MarketIndexes />

      </div>
    </div>
  );
};

export default MarketsPage;