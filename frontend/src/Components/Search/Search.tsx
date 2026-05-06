import React, { ChangeEvent, JSX, SyntheticEvent } from 'react'

interface Props {
    onSearchSubmit: (e: SyntheticEvent) => void;
    search: string | undefined;
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<Props> = ({onSearchSubmit, search, handleSearchChange}: Props) : JSX.Element => {
  return (
    <section className="relative pt-12 pb-8">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-textMain tracking-tight mb-3">
            Find the next big opportunity
          </h1>
          <p className="text-textMuted text-lg">
            Search companies by name or ticker symbol to add to your portfolio.
          </p>
        </div>
        <form
          className="flex items-center w-full p-2 bg-surface rounded-2xl shadow-card border border-slate-200 focus-within:ring-4 focus-within:ring-brandBlue/20 focus-within:border-brandBlue transition-all duration-300"
          onSubmit={onSearchSubmit}
        >
          <div className="pl-4 text-brandBlue">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            className="flex-1 w-full py-3 px-4 text-lg bg-transparent outline-none placeholder-slate-400 text-textMain font-medium"
            id="search-input"
            placeholder="e.g. AAPL, Microsoft, TSLA..."
            value={search}
            onChange={handleSearchChange}
            autoComplete="off"
          />
          <button 
            type="submit"
            className="px-8 py-3 font-bold text-white bg-brandBlue rounded-xl hover:opacity-90 shadow-md transition-all duration-200"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  )
}

export default Search