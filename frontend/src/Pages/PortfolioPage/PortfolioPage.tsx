import React, { useEffect, useState } from "react";
import ListPortfolio from "../../Components/Portfolio/ListPortfolio/ListPortfolio";
import { PortfolioGet } from "../../Models/Portfolio";
import { portfolioGetAPI, portfolioDeleteAPI } from "../../Services/PortfolioService";
import { toast } from "react-toastify";

type Props = {};

const PortfolioPage = (props: Props) => {
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPortfolio();
  }, []);

  const getPortfolio = () => {
    setLoading(true);
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
        setLoading(false);
      })
      .catch((e) => {
        setPortfolioValues(null);
        setLoading(false);
      });
  };

  const onPortfolioDelete = (e: any) => {
    e.preventDefault();
    portfolioDeleteAPI(e.target[0].value)
      .then((res) => {
        if (res) {
          toast.success("Stock removed from portfolio!");
          getPortfolio();
        }
      })
      .catch((e) => {
        toast.warning("Could not remove stock!");
      });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Красивий Header сторінки */}
      <div className="bg-brandBlue py-12 px-4 sm:px-6 lg:px-8 shadow-inner">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
            My Portfolio
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-blue-100">
            Manage your investments, track performance, and stay ahead of the market.
          </p>
        </div>
      </div>

      {/* Тіло сторінки зі списком */}
      <div className="max-w-7xl mx-auto -mt-8 px-4 sm:px-6 lg:px-8 pb-12">
        {loading ? (
          <div className="flex justify-center items-center h-40 bg-white rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 font-medium text-lg animate-pulse">Loading your assets...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 py-8">
             <ListPortfolio
              portfolioValues={portfolioValues || []}
              onPortfolioDelete={onPortfolioDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPage;