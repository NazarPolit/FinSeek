import React, { useState, ChangeEvent, SyntheticEvent } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "../../Components/Search/Search";
import CardList from "../../Components/CardList/CardList";
import { portfolioAddAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

interface Props {}

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onPortfolioCreate = (e: any) => {
    e.preventDefault();
    portfolioAddAPI(e.target[0].value)
      .then((res) => {
        if (res) {
          toast.success("Stock added to portfolio!");
        }
      })
      .catch((e) => {
        toast.warning("Could not add stock to portfolio!");
      });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
      setSearchResult(result.data);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        <Search
          onSearchSubmit={onSearchSubmit}
          search={search}
          handleSearchChange={handleSearchChange}
        />
        
        {serverError && (
          <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-lg text-left font-medium shadow-sm">
            Unable to connect to API: {serverError}
          </div>
        )}
        
        <div className="mt-10">
          <CardList
            searchResults={searchResult}
            onPortfolioCreate={onPortfolioCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;