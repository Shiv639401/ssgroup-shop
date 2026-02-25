import React, { useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { exportToExcel } from "../../utils/exportExcel";
import { exportToPdf } from "../../utils/exportPdf";

export default function AdminAnalytics() {
  const [from, setFrom] = useState("2026-01-01");
  const [to, setTo] = useState("2026-02-21");

  // Later: fetch by date filter
  const rows = useMemo(() => ([
    { date: "2026-02-01", orders: 12, revenue: 5400, users: 8 },
    { date: "2026-02-02", orders: 9, revenue: 3900, users: 4 },
  ]), []);

  const handleExcel = () => exportToExcel(rows, `analytics_${from}_to_${to}.xlsx`);
  const handlePdf = () => {
    const columns = ["date", "orders", "revenue", "users"];
    const body = rows.map(r => [r.date, r.orders, r.revenue, r.users]);
    exportToPdf(columns, body, `analytics_${from}_to_${to}.pdf`);
  };

  return (
    <AdminLayout>
      <div className="glass rounded-2xl p-4 border gold-border shadow-xl">
        <div className="text-lg font-semibold gold-text">Analytics</div>
        <div className="text-[11px] text-white/50">Sales report • User growth • Product performance</div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div>
            <div className="text-xs text-white/70">From</div>
            <input value={from} onChange={(e) => setFrom(e.target.value)}
              type="date" className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2" />
          </div>
          <div>
            <div className="text-xs text-white/70">To</div>
            <input value={to} onChange={(e) => setTo(e.target.value)}
              type="date" className="mt-1 w-full rounded-2xl bg-black/40 border border-white/10 px-3 py-2" />
          </div>
          <div className="flex items-end gap-2">
            <button onClick={handleExcel} className="rounded-2xl px-4 py-2 bg-white/10 border border-white/10 hover:bg-white/15 transition">
              Export Excel
            </button>
            <button onClick={handlePdf} className="rounded-2xl px-4 py-2 bg-yellow-300/20 border gold-border hover:bg-yellow-300/25 transition">
              Download PDF
            </button>
          </div>
        </div>

        <div className="mt-4 overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-white/70">
              <tr className="border-b border-white/10">
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Orders</th>
                <th className="text-left py-2">Revenue</th>
                <th className="text-left py-2">Users</th>
              </tr>
            </thead>
            <tbody className="text-white/85">
              {rows.map((r, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="py-2">{r.date}</td>
                  <td className="py-2">{r.orders}</td>
                  <td className="py-2">{r.revenue}</td>
                  <td className="py-2">{r.users}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}