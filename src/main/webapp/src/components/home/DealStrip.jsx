import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchDeals } from "../../slices/dealSlice";

const DealStrip = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { items: deals = [], status } = useSelector(
    (state) => state.deals
  );

  /* ================= SAFE FETCH ================= */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDeals());
    }
  }, [dispatch, status]);

  /* ================= HANDLE CLICK ================= */
  const handleDealClick = (deal) => {
    if (!deal?.config) return;

    let config = {};

    try {
      config =
        typeof deal.config === "string"
          ? JSON.parse(deal.config)
          : deal.config;
    } catch (err) {
      console.error("Invalid deal config");
      return;
    }

    // 🔥 PRICE DEAL
    if (deal.type === "price-filter" && config.maxPrice) {
      navigate(`/products?maxPrice=${config.maxPrice}`);
      return;
    }

    // 🔥 CATEGORY DEAL
    if (deal.type === "category" && config.category) {
      navigate(`/products?category=${config.category}`);
      return;
    }

    // fallback
    navigate("/products");
  };

  if (status === "loading") {
    return (
      <section className="container pb-8">
        <h2 className="text-xl font-bold text-primary">
          Deals For You
        </h2>
        <div className="py-6">Loading deals...</div>
      </section>
    );
  }

  return (
    <section className="container pb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-primary">
          🔥 Deals For You
        </h2>

        <button
          onClick={() => navigate("/products")}
          className="text-sm font-semibold text-accent hover:underline"
        >
          View all
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {deals.length === 0 ? (
          <div className="text-gray-500">
            No deals available
          </div>
        ) : (
          deals
            .filter((d) => d.active)
            .map((deal) => (
              <button
                key={deal.id}
                onClick={() => handleDealClick(deal)}
                className="min-w-[220px] text-left rounded-2xl bg-white shadow-card hover:shadow-hover transition p-4 border"
              >
                <p className="text-xs font-bold text-accent">
                  {deal.type?.toUpperCase()}
                </p>

                <p className="mt-2 text-lg font-bold text-primary">
                  {deal.title}
                </p>

                <div className="mt-3 text-xs text-muted">
                  Tap to explore →
                </div>
              </button>
            ))
        )}
      </div>
    </section>
  );
};

export default DealStrip;