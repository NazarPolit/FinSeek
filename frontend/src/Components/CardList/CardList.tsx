import React, { SyntheticEvent } from 'react'
import Card from '../Card/Card'
import { JSX } from 'react/jsx-runtime'
import { CompanySearch } from '../../company'
import { v4 as uuidv4 } from "uuid"

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (e: SyntheticEvent) => void;
};

const CardList : React.FC<Props> = ({searchResults, onPortfolioCreate}: Props) : JSX.Element => {
  return <div className="w-full">
  {searchResults.length > 0 ? (
    searchResults.map((result) => {
      return <Card id={result.symbol} key={uuidv4()} searchResult={result} onPortfolioCreate={onPortfolioCreate}/>;
    })
  ): (
      <div className="p-12 mt-6 text-center bg-surface border-2 border-brandBlueLight border-dashed rounded-2xl">
         <p className="text-lg font-medium text-textMuted">
            No results found. Try a different ticker or company name.
         </p>
      </div>
  )}</div>;
};

export default CardList