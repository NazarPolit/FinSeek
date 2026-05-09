import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import RatioList from '../RatioList/RatioList';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';
import Spinner from '../Spinners/Spinners';
import { formatLargeNonMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting.tsx';

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.marketCap),
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Enterprise Value",
    render: (company: CompanyKeyMetrics) => formatLargeNonMonetaryNumber(company.enterpriseValueTTM),
    subTitle: "Measure of a company's total value, including debt and excluding cash",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => formatRatio(company.currentRatioTTM),
    subTitle: "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnEquityTTM),
    subTitle: "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Return On Assets",
    render: (company: CompanyKeyMetrics) => formatRatio(company.returnOnTangibleAssetsTTM),
    subTitle: "Return on assets is the measure of how effective a company is using its assets",
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: CompanyKeyMetrics) => formatRatio(company.freeCashFlowYieldTTM),
    subTitle: "Compares the free cash flow a company earns against its market value",
  },
  {
    label: "Earnings Yield",
    render: (company: CompanyKeyMetrics) => formatRatio(company.earningsYieldTTM),
    subTitle: "Earnings per share divided by the current market price per share",
  },
  {
    label: "EV to EBITDA",
    render: (company: CompanyKeyMetrics) => formatRatio(company.evToEBITDATTM),
    subTitle: "Compares a company's Enterprise Value (EV) to its EBITDA",
  },
  {
    label: "Capex To Revenue",
    render: (company: CompanyKeyMetrics) => formatRatio(company.capexToRevenueTTM),
    subTitle: "Shows the portion of revenue being reinvested into physical assets",
  },
  {
    label: "Graham Number",
    render: (company: CompanyKeyMetrics) => formatRatio(company.grahamNumberTTM),
    subTitle: "The upper bound of the price range that a defensive investor should pay for a stock",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      setErrorMsg(null); 
      
      const value = await getKeyMetrics(ticker);
      
      if (typeof value === "string") {
        if (value.includes("402")) {
           setErrorMsg("Ці дані доступні лише в Premium-тарифі API. Спробуйте великі компанії (наприклад, AAPL, MSFT).");
        } else {
           setErrorMsg(value);
        }
      } else if (value && value.data && value.data.length > 0) {
        setCompanyData(value.data[0]);
      } else {
        setErrorMsg("Немає даних для цієї компанії.");
      }
    };
    
    getCompanyKeyRatios();
  }, [ticker]);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Company Profile</h2>
          <p className="text-slate-500 text-sm mt-1">Key financial metrics, valuation ratios, and profitability indicators.</p>
      </div>

      {errorMsg ? (
        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-700 rounded-r-xl shadow-sm">
          <p className="font-bold">API Access Limited</p>
          <p>{errorMsg}</p>
        </div>
      ) : companyData ? (
        <RatioList config={tableConfig} data={companyData} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CompanyProfile;