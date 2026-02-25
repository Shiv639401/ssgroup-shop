import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RevenueChart({ data }) {
  return (
    <div className="glass rounded-2xl p-4 border gold-border shadow-xl">
      <div className="text-sm font-semibold text-white">Revenue</div>
      <div className="text-[11px] text-white/50">Gross revenue trend</div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
            <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
            <YAxis tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }} />
            <Tooltip
              contentStyle={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(246,211,101,0.25)" }}
              labelStyle={{ color: "white" }}
            />
            <Line type="monotone" dataKey="revenue" stroke="rgba(246,211,101,0.9)" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}