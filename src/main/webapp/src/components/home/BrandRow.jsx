import React from "react";
import { useNavigate } from "react-router-dom";

const brands = [
  { id: 1, name: "Nike" },
  { id: 2, name: "Adidas" },
  { id: 3, name: "Puma" },
  { id: 4, name: "Apple" },
  { id: 5, name: "Samsung" },
  { id: 6, name: "Zara" },
];

const BrandRow = () => {
  const navigate = useNavigate();

  const handleBrandClick = (brandName) => {
    navigate(`/products?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <section className="container pb-10">
      <h2 className="text-xl font-bold text-primary mb-4">
        Top Brands
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {brands.map((b) => (
          <button
            key={b.id}
            onClick={() => handleBrandClick(b.name)}
            className="rounded-2xl bg-white border shadow-card hover:shadow-hover transition p-4 flex items-center justify-center hover:scale-105 active:scale-95"
          >
            <div className="text-primary font-extrabold tracking-wide">
              {b.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default BrandRow;