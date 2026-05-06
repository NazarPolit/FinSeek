import React, { SyntheticEvent } from 'react'
import { JSX } from 'react/jsx-runtime';
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';
import { Link } from 'react-router-dom';

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void; 
};

const Card: React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props) : JSX.Element => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between w-full p-5 mb-4 bg-surface rounded-2xl shadow-card hover:shadow-card-hover border border-slate-100 transition-all duration-300 group"
      id={id}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 w-full md:w-auto mb-4 md:mb-0">
        {/* Іконка */}
        <Link to={`/company/${searchResult.symbol}`} className="flex items-center justify-center w-14 h-14 bg-brandBlueLight rounded-xl text-brandBlue font-extrabold text-2xl group-hover:scale-105 transition-transform">
          {searchResult.symbol.charAt(0)}
        </Link>
        
        {/* Інформація про компанію */}
        <div className="flex flex-col">
          <Link to={`/company/${searchResult.symbol}`} className="font-bold text-xl text-textMain hover:text-brandBlue transition-colors flex items-center gap-3">
            {searchResult.name} 
            <span className="px-2.5 py-1 text-xs font-bold bg-brandBlueLight text-brandBlue rounded-lg tracking-wide">
              {searchResult.symbol}
            </span>
          </Link>
          <p className="text-sm font-medium text-textMuted mt-1">
            {searchResult.exchangeFullName} • <span className="font-bold text-textMain">{searchResult.currency}</span>
          </p>
        </div>
      </div>
      
      {/* Кнопка додавання */}
      <div className="w-full md:w-auto flex justify-end">
        <AddPortfolio
          onPortfolioCreate={onPortfolioCreate}
          symbol={searchResult.symbol}
        />
      </div>
    </div>
  );
};

export default Card;