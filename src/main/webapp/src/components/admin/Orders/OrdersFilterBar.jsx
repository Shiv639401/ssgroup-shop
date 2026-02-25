// src/components/admin/orders/OrdersFilterBar.jsx
import React, { useState } from "react";

const STATUSES = ["ALL", "CREATED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrdersFilterBar({ initial, onApply, onReset }) {
  const [search, setSearch] = useState(initial.search || "");
  const [status, setStatus] = useState(initial.status || "ALL");
  const [from, setFrom] = useState(initial.from || "");
  const [to, setTo] = useState(initial.to || "");

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="text-xs text-white/60">Search Order ID</label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="e.g. 1021"
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-xs text-white/60">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-yellow-400"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-white/60">From</label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-yellow-400"
          />
        </div>

        <div>
          <label className="text-xs text-white/60">To</label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-2 text-white outline-none focus:border-yellow-400"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onApply({ search, status, from, to })}
          className="px-5 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:opacity-90 transition"
        >
          Apply
        </button>
        <button
          onClick={() => {
            setSearch("");
            setStatus("ALL");
            setFrom("");
            setTo("");
            onReset?.();
          }}
          className="px-5 py-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}