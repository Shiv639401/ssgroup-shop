import React from "react";

const pricePresets = [
  { label: "All", value: "all" },
  { label: "Under ₹499", value: "0-499" },
  { label: "₹500 - ₹999", value: "500-999" },
  { label: "₹1000 - ₹1999", value: "1000-1999" },
  { label: "₹2000+", value: "2000-999999" },
];

const ratings = [
  { label: "All", value: 0 },
  { label: "4★ & up", value: 4 },
  { label: "3★ & up", value: 3 },
  { label: "2★ & up", value: 2 },
];

export default function FilterSidebar({
  categories = [],
  filters,
  onChange,
  onClear,
}) {
  return (
    <aside className="bg-white border rounded-2xl shadow-card p-4 sticky top-4 h-fit">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-primary">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm font-semibold text-accent hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Category */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-primary mb-2">Category</p>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={filters.category === "all"}
              onChange={() => onChange({ category: "all" })}
            />
            All
          </label>

          {categories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={filters.category === c}
                onChange={() => onChange({ category: c })}
              />
              {c}
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-primary mb-2">Price Range</p>
        <select
          value={filters.price}
          onChange={(e) => onChange({ price: e.target.value })}
          className="w-full border rounded-xl px-3 py-2 text-sm"
        >
          {pricePresets.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-primary mb-2">Rating</p>
        <select
          value={filters.minRating}
          onChange={(e) => onChange({ minRating: Number(e.target.value) })}
          className="w-full border rounded-xl px-3 py-2 text-sm"
        >
          {ratings.map((r) => (
            <option key={r.value} value={r.value}>
              {r.label}
            </option>
          ))}
        </select>
      </div>

      {/* Stock */}
      <div>
        <p className="text-sm font-semibold text-primary mb-2">Stock</p>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked })}
          />
          In stock only
        </label>
      </div>
    </aside>
  );
}
