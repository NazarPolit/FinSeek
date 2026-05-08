import React, { useEffect, useState } from "react";
import { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import RatioList from "../RatioList/RatioList";
import { getBalanceSheet } from "../../api";
import Spinner from "../Spinners/Spinners";

type Props = {};

const config = [
  {
    label: "Total Assets",
    render: (company: CompanyBalanceSheet) => `$${company.totalAssets?.toLocaleString() || 0}`,
    subTitle: "Total amount of assets owned by the company",
  },
  {
    label: "Current Assets",
    render: (company: CompanyBalanceSheet) => `$${company.totalCurrentAssets?.toLocaleString() || 0}`,
    subTitle: "Assets that can be converted to cash within one year",
  },
  {
    label: "Total Cash",
    render: (company: CompanyBalanceSheet) => `$${company.cashAndCashEquivalents?.toLocaleString() || 0}`,
    subTitle: "Cash and short-term liquid investments",
  },
  {
    label: "Property & Equipment",
    render: (company: CompanyBalanceSheet) => `$${company.propertyPlantEquipmentNet?.toLocaleString() || 0}`,
    subTitle: "Physical assets like buildings, machinery, and land",
  },
  {
    label: "Intangible Assets",
    render: (company: CompanyBalanceSheet) => `$${company.intangibleAssets?.toLocaleString() || 0}`,
    subTitle: "Non-physical assets like patents, trademarks, and goodwill",
  },
  {
    label: "Total Liabilities",
    render: (company: CompanyBalanceSheet) => `$${company.totalLiabilities?.toLocaleString() || 0}`,
    subTitle: "Total amount of debt and financial obligations",
  },
  {
    label: "Current Liabilities",
    render: (company: CompanyBalanceSheet) => `$${company.totalCurrentLiabilities?.toLocaleString() || 0}`,
    subTitle: "Debts and obligations due within one year",
  },
  {
    label: "Long-Term Debt",
    render: (company: CompanyBalanceSheet) => `$${company.longTermDebt?.toLocaleString() || 0}`,
    subTitle: "Loans and financial obligations lasting over one year",
  },
  {
    label: "Stakeholder's Equity",
    render: (company: CompanyBalanceSheet) => `$${company.totalStockholdersEquity?.toLocaleString() || 0}`,
    subTitle: "Net worth of the company (Total Assets - Total Liabilities)",
  },
  {
    label: "Retained Earnings",
    render: (company: CompanyBalanceSheet) => `$${company.retainedEarnings?.toLocaleString() || 0}`,
    subTitle: "Accumulated net income retained for reinvestment",
  },
];

const BalanceSheet = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyBalanceSheet>();

  useEffect(() => {
    const getCompanyData = async () => {
      const value = await getBalanceSheet(ticker!);
      
      if (value && typeof value !== "string" && value.data && value.data.length > 0) {
        setCompanyData(value.data[0]);
      }
    };
    getCompanyData();
  }, [ticker]);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Balance Sheet</h2>
          <p className="text-slate-500 text-sm mt-1">A snapshot of the company's financial position: assets, liabilities, and shareholders' equity.</p>
      </div>

      {companyData ? (
        <RatioList config={config} data={companyData} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default BalanceSheet;