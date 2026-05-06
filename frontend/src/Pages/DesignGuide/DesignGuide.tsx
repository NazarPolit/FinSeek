import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";
import { testIncomeStatementData } from "../../Components/Table/testData";
import { CompanyKeyMetrics } from "../../company";

type Props = {};

// Конфіг для перевірки списку
const listConfig = [
  {
    label: "Market Cap",
    render: (company: any) => company.marketCap || "N/A",
  },
  {
    label: "Cost of Revenue",
    render: (company: any) => company.costOfRevenue || "N/A",
    subTitle: "Total cost incurred to produce goods"
  }
];

// Конфіг для перевірки таблиці
const tableConfig = [
  {
    label: "Date",
    render: (company: any) => company.date || "N/A",
  },
  {
    label: "Revenue",
    render: (company: any) => `$${company.revenue?.toLocaleString() || "0"}`,
  },
  {
    label: "Net Income",
    render: (company: any) => `$${company.netIncome?.toLocaleString() || "0"}`,
  }
];

const DesignGuide = (props: Props) => {
  return (
    <div className="min-h-screen bg-surfaceLight p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                FinSeek Design Guide
            </h1>
            <p className="text-lg text-slate-500">
                This is the design system for FinSeek. These are reusable components of the app with brief instructions on how to use them.
            </p>
        </div>

        <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                RatioList Component
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
                Displays key-value pairs vertically. Great for profile details and metric summaries.
            </p>
            <div className="max-w-md">
                <RatioList data={testIncomeStatementData[0]} config={listConfig}/>
            </div>
        </div>

        <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                Table Component
            </h3>
            <p className="text-slate-500 mb-6 text-sm">
                Table takes in a configuration object and an array of data. Uses dynamic rendering.
            </p>
            <Table data={testIncomeStatementData} config={tableConfig} />
        </div>

      </div>
    </div>
  );
};

export default DesignGuide;