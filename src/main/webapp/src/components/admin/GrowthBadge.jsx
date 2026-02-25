import React from "react";

const GrowthBadge = ({ value = 0 }) => {
  const v = Number(value) || 0;
  const positive = v >= 0;
  return (
    <span
      className={`px-2 py-1 rounded-lg text-xs font-semibold border ${
        positive
          ? "text-green-300 border-green-500/30 bg-green-500/10"
          : "text-red-300 border-red-500/30 bg-red-500/10"
      }`}
    >
      {positive ? "▲" : "▼"} {Math.abs(v).toFixed(1)}%
    </span>
  );
};

export default GrowthBadge;