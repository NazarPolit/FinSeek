import React, { useEffect, useState } from 'react'
import { CompanyKeyMetrics } from '../../company';
import RatioList from '../RatioList/RatioList';
import { useOutletContext } from 'react-router-dom';
import { getKeyMetrics } from '../../api';

interface Props {}

const tableConfig = [
  {
    label: "Market Cap",
    // marketCap йде БЕЗ TTM згідно з документацією
    render: (company: CompanyKeyMetrics) => company.marketCap,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity (ROE)",
    render: (company: CompanyKeyMetrics) => company.returnOnEquityTTM,
  },
  {
    label: "Enterprise Value",
    render: (company: CompanyKeyMetrics) => company.enterpriseValueTTM,
  },
  {
    label: "Return On Assets (ROA)",
    render: (company: CompanyKeyMetrics) => company.returnOnAssetsTTM,
  },
  {
    label: "EV to EBITDA",
    render: (company: CompanyKeyMetrics) => company.evToEBITDATTM,
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