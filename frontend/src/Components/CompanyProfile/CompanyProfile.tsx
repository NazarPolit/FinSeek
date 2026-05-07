import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import RatioList from '../RatioList/RatioList';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => `$${(company.marketCap / 1e9).toFixed(2)}B`,
    subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Enterprise Value",
    render: (company: CompanyKeyMetrics) => `$${(company.enterpriseValueTTM / 1e9).toFixed(2)}B`,
    subTitle: "Total value of a company, including debt and minus cash",
  },
  {
    label: "EV to EBITDA",
    render: (company: CompanyKeyMetrics) => company.evToEBITDATTM?.toFixed(2),
    subTitle: "Valuation multiple comparing enterprise value to earnings",
  },
  {
    label: "EV to Sales",
    render: (company: CompanyKeyMetrics) => company.evToSalesTTM?.toFixed(2),
    subTitle: "Valuation metric comparing enterprise value to revenue",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM?.toFixed(2),
    subTitle: "Measures a company's ability to pay short-term obligations",
  },
  {
    label: "Net Debt to EBITDA",
    render: (company: CompanyKeyMetrics) => company.netDebtToEBITDATTM?.toFixed(2),
    subTitle: "Measurement of leverage",
  },
  {
    label: "Return On Equity (ROE)",
    render: (company: CompanyKeyMetrics) => `${(company.returnOnEquityTTM * 100).toFixed(2)}%`,
    subTitle: "Profitability relative to shareholders' equity",
  },
  {
    label: "Return On Assets (ROA)",
    render: (company: CompanyKeyMetrics) => `${(company.returnOnAssetsTTM * 100).toFixed(2)}%`,
    subTitle: "Profitability relative to total assets",
  },
  {
    label: "Earnings Yield",
    render: (company: CompanyKeyMetrics) => `${(company.earningsYieldTTM * 100).toFixed(2)}%`,
    subTitle: "Earnings per share divided by the share price",
  },
  {
    label: "Cash Conversion Cycle",
    render: (company: CompanyKeyMetrics) => `${company.cashConversionCycleTTM?.toFixed(0)} days`,
    subTitle: "Days to convert inventory investments into cash flows",
  },
];

const CompanyProfile = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();

  useEffect(() => {
    const getCompanyKeyRatios = async () => {
      const value = await getKeyMetrics(ticker);
      
      if (value && typeof value !== "string" && value.data && value.data.length > 0) {
        setCompanyData(value.data[0]);
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

      {companyData ? (
        <RatioList config={tableConfig} data={companyData} />
      ) : (
        <div className="text-slate-500 font-medium">Loading profile data...</div>
      )}
    </div>
  );
};

export default CompanyProfile;