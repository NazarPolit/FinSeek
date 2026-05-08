import React, { useEffect, useState } from "react";
import { CompanyEstimates } from "../../company";
import { getEstimates } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinners/Spinners";

type Props = { ticker: string };

const config = [
  { 
    label: "Year", 
    render: (e: CompanyEstimates) => e.date ? new Date(e.date).getFullYear() : "N/A" 
  },
  { 
    label: "Revenue Est. (Avg)", 
    render: (e: CompanyEstimates) => e.revenueAvg ? `$${(e.revenueAvg / 1e9).toFixed(2)}B` : "N/A" 
  },
  { 
    label: "Net Income Est.", 
    render: (e: CompanyEstimates) => e.netIncomeAvg ? `$${(e.netIncomeAvg / 1e9).toFixed(2)}B` : "N/A" 
  },
  { 
    label: "EPS Est.", 
    render: (e: CompanyEstimates) => e.epsAvg ? e.epsAvg.toFixed(2) : "N/A" 
  },
  { 
    label: "Analysts", 
    render: (e: CompanyEstimates) => e.numAnalystsRevenue ?? 0 
  },
];

const AnalystEstimates = ({ ticker }: Props) => {
  const [estimates, setEstimates] = useState<CompanyEstimates[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstimates = async () => {
      setIsLoading(true);
      setErrorMsg(null);
      
      const result = await getEstimates(ticker);
      
      if (typeof result === "string") {
        setErrorMsg(result);
      } else if (result && result.data && Array.isArray(result.data)) {
        const currentYear = new Date().getFullYear();

        const futureEstimates = result.data.filter((e: CompanyEstimates) => {
          const estimateYear = new Date(e.date).getFullYear();
          return estimateYear >= currentYear && e.revenueAvg && e.revenueAvg > 0;
        });

        const sortedData = [...futureEstimates]
          .sort((a: CompanyEstimates, b: CompanyEstimates) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .slice(0, 5); 
        
        if (sortedData.length > 0) {
          setEstimates(sortedData);
        } else {
          setErrorMsg("No estimates from 2026 onward were found.");
        }
        } else {
          setErrorMsg("Analyst estimates are unavailable.");
        }
      setIsLoading(false);
    };
    fetchEstimates();
  }, [ticker]);

  if (isLoading) return <Spinner />;

  if (errorMsg) {
    return (
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Market Expectations</h4>
        <p className="text-sm text-slate-400">{errorMsg}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 pt-6 border-t border-slate-100">
      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
        Market Expectations (Analyst Estimates)
      </h4>
      <Table config={config} data={estimates} />
    </div>
  );
};

export default AnalystEstimates;