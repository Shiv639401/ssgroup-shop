import React from "react";
import { useNavigate } from "react-router-dom";

const trending = [
  { id: 1, title: "Streetwear", price: "From ₹799" },
  { id: 2, title: "Smart Watches", price: "From ₹999" },
  { id: 3, title: "Wireless Audio", price: "From ₹599" },
  { id: 4, title: "Winter Jackets", price: "From ₹1299" },
  { id: 5, title: "Gym Essentials", price: "From ₹399" },
];

const TrendingRow = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="container pb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">Trending Now</h2>

        <button
          onClick={() => navigate("/products?type=trending")}
          className="text-sm font-semibold text-accent hover:underline"
        >
          Explore
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
        {trending.map((t) => (
          <div
            key={t.id}
            className="snap-start min-w-[260px] rounded-2xl bg-white border shadow-card hover:shadow-hover transition overflow-hidden"
          >
            <div className="h-36 bg-gradient-to-br from-accent/20 to-primary/10" />

            <div className="p-4">
              <p className="font-bold text-primary">{t.title}</p>
              <p className="text-sm text-muted mt-1">{t.price}</p>

              <button
                onClick={() => handleNavigate(t.title)}
                className="mt-4 w-full rounded-xl bg-primary text-white py-2 text-sm font-semibold hover:opacity-90 transition"
              >
                View Picks
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrendingRow;