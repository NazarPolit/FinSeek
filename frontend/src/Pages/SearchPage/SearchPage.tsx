import React, { ChangeEvent, SyntheticEvent, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Hero from '../../Components/Hero/Hero'
import Search from '../../Components/Search/Search'
import { searchCompanies } from '../../api'
import ListPortfolio from '../../Components/Portfolio/ListPortfolio/ListPortfolio'
import CardList from '../../Components/CardList/CardList'
import { CompanySearch } from '../../company'

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    const exists = portfolioValues.find((value) => value === e.target[0].value);
    if(exists) return;
    const updatedPortfolio = [...portfolioValues, e.target[0].value]
    setPortfolioValues(updatedPortfolio);
  }

  const onPortfolioDelete = (e: any) =>{
    e.preventDefault();
    const removed = portfolioValues.filter((value) => {
      return value !== e.target[0].value;
    });
    setPortfolioValues(removed);
  }
  
  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
      const result = await searchCompanies(search);
      if(typeof result === "string"){
        setServerError(result);
      } else if (Array.isArray(result.data)){
        setSearchResult(result.data);
      }
  };

  return (
    <div className="App min-h-screen bg-surfaceLight text-textMain font-sans pb-16">
      <Search 
        onSearchSubmit={onSearchSubmit} 
        search={search} 
        handleSearchChange={handleSearchChange}
      />
      
      {serverError && (
        <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl shadow-sm">
          <p className="font-bold">Connection Error</p>
          <p>{serverError}</p>
        </div>
      )}

      <ListPortfolio 
        portfolioValues={portfolioValues} 
        onPortfolioDelete={onPortfolioDelete}
      />
      
      <div className="max-w-5xl mx-auto px-6 mt-8">
        <h2 className="mb-6 text-2xl font-bold text-textMain">Search Results</h2>
        <CardList 
          searchResults={searchResult} 
          onPortfolioCreate={onPortfolioCreate}
        />
      </div>
    </div>
  )
}

export default SearchPage