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
    subTitle: "Valuation multiple comparing enterprise value to earnings (lower is often better)",
  },
  {
    label: "EV to Sales",
    render: (company: CompanyKeyMetrics) => company.evToSalesTTM?.toFixed(2),
    subTitle: "Valuation metric comparing enterprise value to revenue",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM?.toFixed(2),
    subTitle: "Measures a company's ability to pay short-term obligations (ideal is > 1)",
  },
  {
    label: "Net Debt to EBITDA",
    render: (company: CompanyKeyMetrics) => company.netDebtToEBITDATTM?.toFixed(2),
    subTitle: "Measurement of leverage, showing how many years it would take to pay back debt",
  },
  {
    label: "Return On Equity (ROE)",
    render: (company: CompanyKeyMetrics) => `${(company.returnOnEquityTTM * 100).toFixed(2)}%`,
    subTitle: "Profitability relative to shareholders' equity (how efficiently they use investments)",
  },
  {
    label: "Return On Assets (ROA)",
    render: (company: CompanyKeyMetrics) => `${(company.returnOnAssetsTTM * 100).toFixed(2)}%`,
    subTitle: "Profitability relative to total assets (how efficient management is at using its assets)",
  },
  {
    label: "Earnings Yield",
    render: (company: CompanyKeyMetrics) => `${(company.earningsYieldTTM * 100).toFixed(2)}%`,
    subTitle: "Earnings per share divided by the share price (the inverse of P/E ratio)",
  },
  {
    label: "Cash Conversion Cycle",
    render: (company: CompanyKeyMetrics) => `${company.cashConversionCycleTTM?.toFixed(0)} days`,
    subTitle: "How many days it takes to convert inventory investments into cash flows",
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
    <>
      {companyData ? (
        <>
          <RatioList config={tableConfig} data={companyData} />
        </>
      ) : (
        <h1 className="text-slate-500 font-medium">Loading or No data found...</h1>
      )}
    </>
  );
};

export default CompanyProfile;