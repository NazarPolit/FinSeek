import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { CompanyCashFlow } from "../../company";
import { getCashFlow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinners";

type Props = {};

const config = [
  {
    label: "Date",
    render: (company: CompanyCashFlow) => company.date,
  },
  {
    label: "Operating Cashflow",
    render: (company: CompanyCashFlow) => `$${company.operatingCashFlow?.toLocaleString() || 0}`,
  },
  {
    label: "Investing Cashflow",
    render: (company: CompanyCashFlow) => `$${company.netCashProvidedByInvestingActivities?.toLocaleString() || 0}`,
  },
  {
    label: "Property/Machinery Cashflow",
    render: (company: CompanyCashFlow) => `$${company.investmentsInPropertyPlantAndEquipment?.toLocaleString() || 0}`,
  },
  {
    label: "Other Investing Cashflow",
    render: (company: CompanyCashFlow) => `$${company.otherInvestingActivities?.toLocaleString() || 0}`,
  },
  {
    label: "Financing Cashflow",
    render: (company: CompanyCashFlow) => `$${company.netCashProvidedByFinancingActivities?.toLocaleString() || 0}`,
  },
  {
    label: "CapEX (Capital Expenditure)",
    render: (company: CompanyCashFlow) => `$${company.capitalExpenditure?.toLocaleString() || 0}`,
  },
  {
    label: "Free Cash Flow",
    render: (company: CompanyCashFlow) => `$${company.freeCashFlow?.toLocaleString() || 0}`,
  },
];

const CashflowStatement = (props: Props) => {
  const ticker = useOutletContext<string>();
  const [cashFlowData, setCashFlowData] = useState<CompanyCashFlow[]>();

  useEffect(() => {
    const fetchCashflow = async () => {
      const result = await getCashFlow(ticker);
      
      if (result && typeof result !== "string" && result.data && result.data.length > 0) {
        setCashFlowData(result.data);
      }
    };
    fetchCashflow();
  }, [ticker]);

  return (
    <div className="w-full flex flex-col">
      <div className="mb-6">
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Cashflow Statement</h2>
          <p className="text-slate-500 text-sm mt-1">Detailed summary of cash inflows and outflows from operations, investing, and financing.</p>
      </div>

      {cashFlowData ? (
        <Table config={config} data={cashFlowData} />
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default CashflowStatement;