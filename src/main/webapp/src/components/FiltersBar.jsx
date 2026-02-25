import React, { useState } from "react";

const FiltersBar = ({ onFilterChange }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState(5000);

  const handleApplyFilters = () => {
    onFilterChange({
      search,
      category,
      sort,
      priceRange,
    });
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="border rounded-lg px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-black"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Category Dropdown */}
      <select
        className="border rounded-lg px-4 py-2 w-full md:w-1/5 focus:outline-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="electronics">Electronics</option>
        <option value="fashion">Fashion</option>
        <option value="home">Home</option>
      </select>

      {/* Price Range */}
      <div className="flex flex-col w-full md:w-1/5">
        <label className="text-sm mb-1">
          Max Price: ₹ {priceRange}
        </label>
        <input
          type="range"
          min="0"
          max="50000"
          step="500"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="cursor-pointer"
        />
      </div>

      {/* Sort */}
      <select
        className="border rounded-lg px-4 py-2 w-full md:w-1/5"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="">Sort By</option>
        <option value="low-high">Price: Low to High</option>
        <option value="high-low">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>

      {/* Apply Button */}
      <button
        onClick={handleApplyFilters}
        className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        Apply
      </button>
    </div>
  );
};

export default FiltersBar;
