import React, { SyntheticEvent } from 'react'
import DeletePortfolio from '../DeletePortfolio/DeletePortfolio';
import { Link } from 'react-router-dom';

interface Props{
    portfolioValue: string;
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const CardPortfolio = ({portfolioValue, onPortfolioDelete}: Props) => {
  return (
    <div className="relative flex flex-col justify-between p-6 bg-surface border border-slate-200 rounded-2xl shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 group">
      
      {/* Верхня частина з іконкою та кнопкою видалення */}
      <div className="flex items-start justify-between mb-4">
        <Link to={`/company/${portfolioValue}`} className="flex items-center justify-center w-12 h-12 bg-brandBlueLight rounded-xl text-brandBlue font-extrabold text-xl group-hover:bg-brandBlue group-hover:text-white transition-colors duration-300">
          {portfolioValue.charAt(0)}
        </Link>
        <DeletePortfolio
          portfolioValue={portfolioValue}
          onPortfolioDelete={onPortfolioDelete}
        />
      </div>

      <div className="flex-1">
        <p className="text-xs font-bold text-textMuted uppercase tracking-widest mb-1">Ticker</p>
        <Link 
          to={`/company/${portfolioValue}/company-profile`}
          className="text-3xl font-extrabold text-textMain tracking-tight hover:text-brandBlue transition-colors">
          {portfolioValue}
        </Link>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link to={`/company/${portfolioValue}`} className="flex items-center text-sm font-semibold text-brandBlue hover:text-brandBlueHover transition-colors">
          View Analytics
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default CardPortfolio