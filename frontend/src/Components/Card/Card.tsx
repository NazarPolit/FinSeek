import React from 'react'
import "./Card.css"
import { JSX } from 'react/jsx-runtime';
import { CompanySearch } from '../../company';

interface Props {
  id: string;
  searchResult: CompanySearch;
};

const Card: React.FC<Props> = ({id, searchResult}: Props) : JSX.Element => {
  return (
    <div className="card">
      <img
        alt="Company log"
      />
      <div className="details">
        <h2>
          {searchResult.name} ({searchResult.symbol})
        </h2>
        <p>${searchResult.currency}</p>
      </div>
      <p className="infon">
        {searchResult.exchangeShortName} - {searchResult.stockExchange}
      </p>
    </div>
  );
};

export default Card;
