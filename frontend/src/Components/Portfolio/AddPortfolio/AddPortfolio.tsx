import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioCreate: (e: SyntheticEvent) => void;
    symbol: string;
};

const AddPortfolio = ({onPortfolioCreate, symbol}: Props) => {
  return (
    <form onSubmit={onPortfolioCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button
          type="submit"
          className="p-2 px-8 text-white bg-darkBlue rounded-lg hover:opacity-70 focus:outline-none"
        >
          Add
        </button>
    </form>
  )
}

export default AddPortfolio
