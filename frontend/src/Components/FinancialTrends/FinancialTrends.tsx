import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getIncomeStatement } from "../../api";
import SimpleLineChart from "../SimpleLineChart/SimpleLineChart";
import { CompanyIncomeStatement } from "../../company";
import Spinner from "../Spinners/Spinners";

const FinancialTrends = () => {
  const ticker = useOutletContext<string>();
  const [data, setData] = useState<CompanyIncomeStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      const result = await getIncomeStatement(ticker);
      
      if (Array.isArray(result) && result.length > 0) {
        const sorted = [...result].sort((a, b) => 
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setData(sorted);
      }
      setIsLoading(false);
    };
    fetchTrends();
  }, [ticker]);

  if (isLoading) return <Spinner />;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-slate-800">
        Revenue vs Net Income (Annual)
      </h2>
      {data.length > 0 ? (
        <SimpleLineChart data={data} />
      ) : (
        <p>Дані для аналізу відсутні.</p>
      )}
    </div>
  );
};

export default FinancialTrends;