import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRevenue } from "../../../slices/orderSlice";

const FILTERS = [
  { label: "Today", value: "TODAY" },
  { label: "7 Days", value: "7DAYS" },
  { label: "30 Days", value: "30DAYS" },
  { label: "All", value: "ALL" },
];

export default function RevenueFilter() {
  const dispatch = useDispatch();
  const [active, setActive] = useState("TODAY");
  const { revenue, revenueStatus, revenueError } = useSelector((s) => s.orders);

  useEffect(() => {
    // ✅ FIX: thunk expects a STRING, not object
    dispatch(fetchRevenue(active));
  }, [dispatch, active]);

  const Card = ({ title, value }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="text-white/60 text-sm">{title}</div>
      <div className="mt-2 text-2xl font-bold text-yellow-400">
        ₹ {Number(value || 0).toLocaleString("en-IN")}
      </div>
    </div>
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="text-white font-semibold">Revenue</div>
          <div className="text-white/60 text-sm">
            {revenueStatus === "loading"
              ? "Updating…"
              : revenueError
              ? `Error: ${revenueError}`
              : "Auto-updates by filter"}
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-4 py-2 rounded-xl text-sm border transition ${
                active === f.value
                  ? "bg-yellow-400 text-black border-yellow-400"
                  : "bg-white/5 text-white border-white/10 hover:bg-white/10"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <Card title="Today Revenue" value={revenue.todayRevenue} />
        <Card title="This Month Revenue" value={revenue.monthRevenue} />
        <Card title="Total Revenue" value={revenue.totalRevenue} />
      </div>
    </div>
  );
}