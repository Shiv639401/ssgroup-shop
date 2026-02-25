import React from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { id: 1, name: "Mobiles", slug: "mobiles", emoji: "📱" },
  { id: 2, name: "Fashion", slug: "fashion", emoji: "👕" },
  { id: 3, name: "Shoes", slug: "shoes", emoji: "👟" },
  { id: 4, name: "Beauty", slug: "beauty", emoji: "💄" },
  { id: 5, name: "Watches", slug: "watches", emoji: "⌚" },
  { id: 6, name: "Home", slug: "home", emoji: "🏠" },
  { id: 7, name: "Sports", slug: "sports", emoji: "🏋️" },
  { id: 8, name: "Accessories", slug: "accessories", emoji: "👜" },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  return (
    <section className="container pb-10">
      <h2 className="text-xl font-bold text-primary mb-4">
        Shop by Category
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => handleCategoryClick(c.slug)}
            className="rounded-2xl bg-white border shadow-card hover:shadow-hover hover:scale-105 transition p-4 text-center"
          >
            <div className="text-3xl">{c.emoji}</div>
            <div className="mt-2 text-sm font-semibold text-primary">
              {c.name}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;