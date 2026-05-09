import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { PortfolioGet } from "../../../Models/Portfolio";

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm hover:shadow-md border border-slate-100 transition-all duration-300 overflow-hidden group">
      
      <div className="flex justify-between items-center px-6 py-4 border-b border-slate-50 bg-slate-50/50">
        <Link
          to={`/company/${portfolioValue.symbol}/company-profile`}
          className="text-2xl font-extrabold text-slate-800 group-hover:text-brandBlue transition-colors"
        >
          {portfolioValue.symbol}
        </Link>
        <DeletePortfolio
          portfolioValue={portfolioValue.symbol}
          onPortfolioDelete={onPortfolioDelete}
        />
      </div>

      <div className="px-6 py-5 space-y-4">
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">
            Company
          </p>
          <p className="text-lg font-bold text-slate-700 truncate">
            {portfolioValue.companyName || "Unknown Company"}
          </p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-2">
              Industry
            </p>
            <span className="inline-block px-3 py-1 bg-blue-50 text-brandBlue text-xs font-bold rounded-full">
              {portfolioValue.industry || "General"}
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default CardPortfolio;