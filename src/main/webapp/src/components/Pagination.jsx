import React from "react";

const Pagination = ({
  currentPage = 0,   // 0-based (Spring Boot)
  totalPages = 0,
  onPageChange,
}) => {

  if (!totalPages || totalPages <= 1) return null;

  const pages = [];
  const windowSize = 2; // show 2 pages before & after current

  const start = Math.max(0, currentPage - windowSize);
  const end = Math.min(totalPages - 1, currentPage + windowSize);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">

      {/* Previous */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className={`px-4 py-2 rounded-xl border text-sm transition
          ${
            currentPage === 0
              ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
      >
        Previous
      </button>

      {/* First page shortcut */}
      {start > 0 && (
        <>
          <button
            onClick={() => onPageChange(0)}
            className="w-10 h-10 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-white/10 transition"
          >
            1
          </button>
          {start > 1 && <span className="text-white/40">...</span>}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 rounded-xl border text-sm transition
            ${
              currentPage === page
                ? "bg-yellow-400 border-yellow-400 text-black font-bold"
                : "bg-white/5 border-white/10 text-white hover:bg-white/10"
            }`}
        >
          {page + 1}
        </button>
      ))}

      {/* Last page shortcut */}
      {end < totalPages - 1 && (
        <>
          {end < totalPages - 2 && (
            <span className="text-white/40">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages - 1)}
            className="w-10 h-10 rounded-xl border bg-white/5 border-white/10 text-white hover:bg-white/10 transition"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className={`px-4 py-2 rounded-xl border text-sm transition
          ${
            currentPage === totalPages - 1
              ? "bg-white/5 border-white/10 text-white/40 cursor-not-allowed"
              : "bg-white/5 border-white/10 text-white hover:bg-white/10"
          }`}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;