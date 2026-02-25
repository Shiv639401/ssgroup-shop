import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const RevenueAreaChart = ({ data = [], title = "Revenue (Last 30 Days)" }) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">{title}</h3>
        <span className="text-white/50 text-xs">Daily</span>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="date" tick={{ fill: "rgba(255,255,255,0.6)" }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.6)" }} />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 12,
              }}
            />
            <Area type="monotone" dataKey="revenue" strokeWidth={2} fillOpacity={0.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueAreaChart;