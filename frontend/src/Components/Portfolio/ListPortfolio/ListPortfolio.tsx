import React, { SyntheticEvent } from 'react'
import CardPortfolio from '../CardPortfolio/CardPortfolio';

interface Props {
    portfolioValues: string[];
    onPortfolioDelete: (e: SyntheticEvent) => void;
}

const ListPortfolio = ({portfolioValues, onPortfolioDelete}: Props) => {
  return (
    <section id="portfolio" className="py-12 bg-surfaceLight">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-extrabold text-textMain tracking-tight">
            My Portfolio
          </h2>
          <span className="px-4 py-1.5 bg-brandGreen/10 text-brandGreen font-bold rounded-full text-sm border border-brandGreen/20">
            {portfolioValues.length} Assets
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {portfolioValues.length > 0 ? (
            portfolioValues.map((portfolioValue) => {
              return (
                <CardPortfolio
                  key={portfolioValue}
                  portfolioValue={portfolioValue}
                  onPortfolioDelete={onPortfolioDelete}
                />
              );
            })
          ) : (
            <div className="col-span-full p-10 text-center bg-surface border border-slate-200 rounded-3xl shadow-sm">
              <h3 className="text-lg font-medium text-textMuted">
                Your portfolio is empty. Add some stocks above to start tracking.
              </h3>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ListPortfolio