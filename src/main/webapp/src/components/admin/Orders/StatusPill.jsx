// src/components/admin/orders/StatusPill.jsx
import React from "react";

const MAP = {
  CREATED: "bg-white/10 text-white",
  CONFIRMED: "bg-blue-500/20 text-blue-300",
  SHIPPED: "bg-purple-500/20 text-purple-300",
  DELIVERED: "bg-green-500/20 text-green-300",
  CANCELLED: "bg-red-500/20 text-red-300",
};

export default function StatusPill({ status }) {
  const cls = MAP[status] || "bg-white/10 text-white";
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}