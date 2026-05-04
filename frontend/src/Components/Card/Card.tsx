import React, { SyntheticEvent } from 'react'
import "./Card.css"
import { JSX } from 'react/jsx-runtime';
import { CompanySearch } from '../../company';
import AddPortfolio from '../Portfolio/AddPortfolio/AddPortfolio';

interface Props {
  id: string;
  searchResult: CompanySearch;
  onPortfolioCreate: (e: SyntheticEvent) => void; 
};

const Card: React.FC<Props> = ({id, searchResult, onPortfolioCreate}: Props) : JSX.Element => {
  return (
    <div className="card">
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>{searchResult.currency}</p>
      </div>
      <p className="infon">
        {searchResult.exchange} - {searchResult.exchangeFullName}
      </p>
      <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={searchResult.symbol}/>
    </div>
  );
};

export default Card;
