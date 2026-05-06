import React, { SyntheticEvent } from 'react'

interface Props {
    onPortfolioDelete: (e: SyntheticEvent) => void;
    portfolioValue: string;
};

const DeletePortfolio = ({onPortfolioDelete, portfolioValue}: Props) => {
  return (
    <form onSubmit={onPortfolioDelete}>
      <input hidden={true} value={portfolioValue} readOnly />
      <button 
        type="submit"
        className="flex items-center justify-center w-8 h-8 text-slate-300 bg-transparent rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors duration-200 focus:outline-none"
        title="Remove from portfolio"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </form>
  )
}

export default DeletePortfolio