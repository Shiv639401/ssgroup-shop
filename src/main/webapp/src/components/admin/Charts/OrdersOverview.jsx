import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip } from "recharts";

export default function OrdersOverview({ data }) {
  return (
    <div className="glass rounded-2xl p-4 border gold-border shadow-xl">
      <div className="text-sm font-semibold text-white">Orders Overview</div>
      <div className="text-[11px] text-white/50">Pending / Shipped / Delivered</div>

      <div className="mt-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip
              contentStyle={{ background: "rgba(0,0,0,0.75)", border: "1px solid rgba(246,211,101,0.25)" }}
              labelStyle={{ color: "white" }}
            />
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} fill="rgba(246,211,101,0.5)" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}