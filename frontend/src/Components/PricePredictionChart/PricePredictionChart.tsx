import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getPricePredictionAPI, PredictionData } from "../../api";

interface Props {
  symbol: string;
}

const PricePredictionChart = ({ symbol }: Props) => {
  const [data, setData] = useState<PredictionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      const predictionData = await getPricePredictionAPI(symbol);
      setData(predictionData);
      setIsLoading(false);
    };

    fetchPredictions();
  }, [symbol]);

  if (isLoading) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-100 h-96 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#5b52f6] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white shadow-sm rounded-xl p-5 sm:p-6 border border-slate-100 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900">7-Day Price Forecast</h3>
          <p className="text-sm text-slate-500 font-medium">
            Multi-model projection vs AI Analysis
          </p>
        </div>
      </div>

      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} domain={['auto', 'auto']} tickFormatter={(value) => `$${value}`} />
            
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', padding: '12px' }}
                itemStyle={{ fontWeight: 600, fontSize: '14px' }}
                labelStyle={{ color: '#64748b', marginBottom: '8px', fontWeight: 500 }}
                formatter={(value: any) => {
                    if (typeof value === 'number') return [`$${value.toFixed(2)}`];
                    return [value];
                }}
            />
            
            <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', paddingTop: '15px', fontWeight: 500 }} />

            <Line type="monotone" dataKey="actual" name="Actual Price" stroke="#0f172a" strokeWidth={3} dot={{ r: 3, fill: '#0f172a' }} activeDot={{ r: 6 }} />
            
            <Line type="monotone" dataKey="linear" name="Linear Trend" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            
            <Line type="monotone" dataKey="ema" name="EMA Projection" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} />
            
            <Line type="monotone" dataKey="ai" name="AI Forecast ✨" stroke="#5b52f6" strokeWidth={3} dot={{ r: 4, fill: '#5b52f6' }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PricePredictionChart;