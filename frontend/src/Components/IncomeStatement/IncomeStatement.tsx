import React, { useEffect, useState } from 'react'
import { CompanyIncomeStatement } from '../../company';
import { useOutletContext } from 'react-router-dom';
import { getIncomeStatement } from '../../api';
import Table from '../Table/Table';
import Spinner from '../Spinners/Spinners';
import { formatLargeMonetaryNumber, formatRatio } from '../../Helpers/NumberFormatting.tsx';

const configs = [
  {
    label: "Date",
    render: (company: CompanyIncomeStatement) => company.date,
  },
  {
    label: "Revenue",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.revenue),
  },
  {
    label: "Cost Of Revenue",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.costOfRevenue),
  },
  {
    label: "Depreciation",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.depreciationAndAmortization),
  },
  {
    label: "Operating Income",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.operatingIncome),
  },
  {
    label: "Income Before Taxes",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.incomeBeforeTax),
  },
  {
    label: "Net Income",
    render: (company: CompanyIncomeStatement) => formatLargeMonetaryNumber(company.netIncome),
  },
  {
    label: "Net Income Ratio",
    // ВИПРАВЛЕНО: Рахуємо самостійно (Net Income / Revenue)
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? formatRatio(company.netIncome / company.revenue) : "N/A",
  },
  {
    label: "Earnings Per Share",
    render: (company: CompanyIncomeStatement) => formatRatio(company.eps),
  },
  {
    label: "Earnings Per Diluted",
    render: (company: CompanyIncomeStatement) => formatRatio(company.epsDiluted),
  },
  {
    label: "Gross Profit Ratio",
    // ВИПРАВЛЕНО: Рахуємо самостійно (Gross Profit / Revenue)
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? formatRatio(company.grossProfit / company.revenue) : "N/A",
  },
  {
    label: "Operating Income Ratio",
    // ВИПРАВЛЕНО: Рахуємо самостійно (Operating Income / Revenue)
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? formatRatio(company.operatingIncome / company.revenue) : "N/A",
  },
  {
    label: "Income Before Taxes Ratio",
    // ВИПРАВЛЕНО: Рахуємо самостійно (Income Before Tax / Revenue)
    render: (company: CompanyIncomeStatement) => 
      company.revenue ? formatRatio(company.incomeBeforeTax / company.revenue) : "N/A",
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
        // ВИПРАВЛЕНО: Перевіряємо, чи є result масивом, і не використовуємо .data
        if (Array.isArray(result) && result.length > 0) {
          setIncomeStatement(result);
        }
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
        <Spinner />
      )}
    </div>
  )
}

export default IncomeStatement