import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CompanyKeyMetrics, CompanyProfile as CompanyProfileType } from '../../company';
import { getKeyMetrics, getCompanyProfile } from '../../api';
import RatioList from '../RatioList/RatioList';
import Spinner from '../Spinners/Spinners';
import CompFinder from '../CompFinder/CompFinder';
import AnalystEstimates from '../AnalystEstimates/AnalystEstimates';
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
  const [companyMetrics, setCompanyMetrics] = useState<CompanyKeyMetrics>();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfileType>();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMsg(null); 
      
      const metricsValue = await getKeyMetrics(ticker);
      const profileValue = await getCompanyProfile(ticker);
      
      if (typeof profileValue !== "string" && profileValue?.data && profileValue.data.length > 0) {
        setCompanyProfile(profileValue.data[0]);
      }

      if (typeof metricsValue === "string") {
        if (metricsValue.includes("402") || metricsValue.includes("403")) {
           setErrorMsg("Ці дані доступні лише в Premium-тарифі API. Спробуйте великі компанії (наприклад, AAPL, MSFT).");
        } else {
           setErrorMsg(metricsValue);
        }
      } else if (metricsValue && metricsValue.data && metricsValue.data.length > 0) {
        setCompanyMetrics(metricsValue.data[0]);
      } else {
        setErrorMsg("Немає даних для цієї компанії.");
      }

      setIsLoading(false);
    };
    
    fetchData();
  }, [ticker]);

  if (isLoading) return <Spinner />;

  return (
    <div className="w-full flex flex-col gap-6">
      
      <div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Company Profile</h2>
          <p className="text-slate-500 text-sm mt-1">Overview, peer comparison, and key financial metrics.</p>
      </div>

      {companyProfile?.description && (
        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-3">About {companyProfile.companyName}</h3>
          <p className="text-slate-600 text-sm leading-relaxed text-justify">
            {companyProfile.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Compare with Peers</h3>
            <CompFinder ticker={ticker} />
          </div>

          <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
            <AnalystEstimates ticker={ticker} />
          </div>
      </div>

      {errorMsg ? (
        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-700 rounded-r-xl shadow-sm">
          <p className="font-bold">API Access Limited</p>
          <p>{errorMsg}</p>
        </div>
      ) : companyMetrics ? (
        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Key Metrics Overview</h3>
          <RatioList config={tableConfig} data={companyMetrics} />
        </div>
      ) : null}

    </div>
  );
};

export default CompanyProfile;