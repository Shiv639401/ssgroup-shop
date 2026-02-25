import React from "react";

export default function Pagination({ page = 0, totalPages = 0, onChange }) {
  if (!totalPages || totalPages <= 1) return null;

  const prevDisabled = page <= 0;
  const nextDisabled = page >= totalPages - 1;

  return (
    <div className="flex items-center justify-between gap-3 mt-6">
      <div className="text-sm text-white/70">
        Page <span className="text-white font-semibold">{page + 1}</span> of{" "}
        <span className="text-white font-semibold">{totalPages}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className={`px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition ${
            prevDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={prevDisabled}
          onClick={() => onChange?.(page - 1)}
        >
          Prev
        </button>

        <button
          className={`px-3 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition ${
            nextDisabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={nextDisabled}
          onClick={() => onChange?.(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}