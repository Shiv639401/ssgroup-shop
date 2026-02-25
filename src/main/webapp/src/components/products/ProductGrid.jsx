import React from "react";
import { toast } from "sonner";

export default function ProductGrid({
  products,
  onViewDetails,
  onQuickView,
  onAddToCart,
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => {
        const imageUrl = product?.images?.length ? product.images[0] : null;
        const stock = typeof product.stock === "number" ? product.stock : 999;

        return (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden"
          >
            <div className="relative h-56 bg-gray-100 overflow-hidden">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}

              {/* Hover actions */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => onQuickView(product)}
                    className="px-3 py-2 rounded-xl bg-white text-primary text-sm font-semibold"
                  >
                    Quick view
                  </button>
                  <button
                    onClick={() => {
                      if (stock === 0) {
                        toast.error("Out of stock ❌");
                        return;
                      }
                      onAddToCart(product);
                    }}
                    className={`px-3 py-2 rounded-xl text-sm font-semibold text-white ${
                      stock === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
                    }`}
                    disabled={stock === 0}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 text-center">
              <h3 className="font-semibold text-primary line-clamp-1">
                {product.title}
              </h3>
              <p className="text-accent font-bold mt-1">₹ {product.price}</p>

              <button
                onClick={() => onViewDetails(product.id)}
                className="mt-3 w-full py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition"
              >
                View Details
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
