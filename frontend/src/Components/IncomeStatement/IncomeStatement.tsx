import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => `$${company.revenue?.toLocaleString() || 0}`,
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => `$${company.costOfRevenue?.toLocaleString() || 0}`,
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) => `$${company.depreciationAndAmortization?.toLocaleString() || 0}`,
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => `$${company.operatingIncome?.toLocaleString() || 0}`,
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => `$${company.incomeBeforeTax?.toLocaleString() || 0}`,
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => `$${company.netIncome?.toLocaleString() || 0}`,
  },
  {
    label: "Net Income Ratio",
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? `${((company.netIncome / company.revenue) * 100).toFixed(2)}%` : "0%",
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => `$${company.eps?.toFixed(2)}`,
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => `$${company.epsDiluted?.toFixed(2)}`,
  },
  {
    label: "Gross Profit Ratio",
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? `${((company.grossProfit / company.revenue) * 100).toFixed(2)}%` : "0%",
  },
  {
    label: "Operating Income Ratio",
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? `${((company.operatingIncome / company.revenue) * 100).toFixed(2)}%` : "0%",
  },
  {
    label: "Income Before Taxes Ratio",
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? `${((company.incomeBeforeTax / company.revenue) * 100).toFixed(2)}%` : "0%",
  },
];

interface Props {}

const IncomeStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();

  useEffect(() => {
    const incomeStatementFetch = async () => {
      try {
        const result = await getIncomeStatement(ticker);
        setIncomeStatement(result);
      } catch (error) {
        console.log(error);
      }
    };
    incomeStatementFetch();
  }, [ticker]);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Income Statement</h2>
          <p className="text-slate-500 text-sm mt-1">Annual financial performance, revenue, and expenses.</p>
      </div>

      {incomeStatement && incomeStatement.length > 0 ? (
        <Table config={configs} data={incomeStatement} />
      ) : (
        <div className="text-slate-500 font-medium">Loading Income Statement...</div>
      )}
    </div>
  )
}

export default IncomeStatement