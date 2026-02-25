import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const [added, setAdded] = useState(false);

  /* ================= DISCOUNT ================= */
  const discount =
    product?.mrp && product?.price
      ? Math.round(
          ((product.mrp - product.price) / product.mrp) * 100
        )
      : 0;

  /* ================= IMAGE HANDLING ================= */
  let imageUrl = null;

  if (
    Array.isArray(product?.images) &&
    product.images.length > 0
  ) {
    imageUrl = product.images[0];
  } else if (typeof product?.images === "string") {
    try {
      const parsed = JSON.parse(product.images);
      imageUrl = parsed[0];
    } catch {
      imageUrl = null;
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden group hover:shadow-2xl transition duration-300 relative">

      {/* Discount Badge */}
      {discount > 0 && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-lg z-10">
          {discount}% OFF
        </span>
      )}

      {/* Product Image */}
      <Link to={`/products/${product?.id}`}>
        <div className="overflow-hidden h-56 bg-gray-100 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product?.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <span className="text-gray-400 text-sm">
              No Image
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">

        {/* Title */}
        <h3 className="text-lg font-semibold truncate">
          {product?.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mt-1 text-yellow-500 text-sm">
          {"⭐".repeat(Math.round(product?.rating || 4))}
          <span className="text-gray-500 ml-2">
            ({product?.rating || 4})
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-bold text-green-600">
            ₹ {product?.price}
          </span>

          {product?.mrp && (
            <span className="text-sm text-gray-400 line-through">
              ₹ {product.mrp}
            </span>
          )}
        </div>

        {/* Stock */}
        <p
          className={`text-sm mt-1 ${
            product?.stock > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {product?.stock > 0
            ? "In Stock"
            : "Out of Stock"}
        </p>

        {/* Add to Cart Button */}
        <button
          disabled={product?.stock === 0}
          onClick={() => {
            if (product?.stock > 0) {
              onAddToCart(product);
              setAdded(true);
              setTimeout(() => {
                setAdded(false);
              }, 1500);
            }
          }}
          className={`mt-4 w-full py-2 rounded-xl font-medium transition ${
            product?.stock > 0
              ? added
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-gray-800"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product?.stock > 0
            ? added
              ? "Added ✅"
              : "Add to Cart"
            : "Unavailable"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;