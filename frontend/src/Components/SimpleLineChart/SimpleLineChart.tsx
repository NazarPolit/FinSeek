import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Props = {
  data: any[];
};

const SimpleLineChart = ({ data }: Props) => {
  return (
    <div className="w-full bg-white p-4 shadow rounded-lg border border-slate-100">
      <ResponsiveContainer width="99%" height={450}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          
          <XAxis 
            dataKey="date" 
            stroke="#64748b" 
            fontSize={12} 
            tickFormatter={(dateStr) => dateStr ? dateStr.substring(0, 4) : ""}
          />
          
          <YAxis 
            stroke="#64748b" 
            fontSize={12} 
            tickFormatter={(value) => `$${(value / 1e9).toFixed(0)}B`} 
          />
          
          <Tooltip 
            formatter={(value: any, name: any) => [
              `$${(Number(value) / 1e9).toFixed(2)}B`, 
              name
            ]}
            labelFormatter={(label) => `Year: ${label ? label.substring(0, 4) : ""}`}
          />
          <Legend verticalAlign="bottom" height={36}/>
          
          <Line
            name="Revenue"
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            name="Net Income"
            type="monotone"
            dataKey="netIncome"
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleLineChart;