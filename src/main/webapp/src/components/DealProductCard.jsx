import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { fetchDeals } from "../slices/dealSlice";
import DealProductCard from "../components/DealProductCard";

const DealProducts = ({ onAddToCart }) => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const decodedSlug = decodeURIComponent(slug);

  const { items: products = [] } = useSelector(
    (state) => state.products
  );

  const { items: deals = [] } = useSelector(
    (state) => state.deals
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchDeals());
  }, [dispatch]);

  const currentDeal = useMemo(() => {
    return deals.find(
      (d) =>
        d.slug?.toLowerCase() === decodedSlug.toLowerCase() &&
        d.active
    );
  }, [decodedSlug, deals]);

  const filteredProducts = useMemo(() => {
    if (!currentDeal) return [];

    let config = {};

    try {
      config =
        typeof currentDeal.config === "string"
          ? JSON.parse(currentDeal.config)
          : currentDeal.config || {};
    } catch {
      return [];
    }

    if (currentDeal.type === "price-filter") {
      return products.filter(
        (p) => Number(p.price) <= Number(config?.maxPrice || 0)
      );
    }

    if (currentDeal.type === "category") {
      return products.filter((p) =>
        p.category
          ?.toLowerCase()
          .includes(config?.category?.toLowerCase() || "")
      );
    }

    return [];
  }, [products, currentDeal]);

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-12">
          Deals: {decodedSlug.replace("-", " ")}
        </h1>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">
            No deals found.
          </div>
        ) : (
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <DealProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DealProducts;