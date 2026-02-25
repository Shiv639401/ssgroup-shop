import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productSlice";
import { addToCart } from "../slices/cartSlice";
import { Link, useLocation } from "react-router-dom";

const MAX_LIMIT = 100000;

const Products = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items = [], status } = useSelector((state) => state.products);

  const [maxPrice, setMaxPrice] = useState(MAX_LIMIT);
  const [sort, setSort] = useState("latest");
  const [ratingFilter, setRatingFilter] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [toast, setToast] = useState("");

  /* ================= URL PARAMS ================= */
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");
  const dealMaxPrice = queryParams.get("maxPrice");

  /* ================= SAFE FETCH (NO LOOP) ================= */
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  /* ================= APPLY DEAL FILTER ================= */
  useEffect(() => {
    if (dealMaxPrice) {
      setMaxPrice(Number(dealMaxPrice));
    }
  }, [dealMaxPrice]);

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const handleAddToCart = async (product) => {
    if (!product?.id) return showToast("Invalid product ❌");
    if (product.stock === 0) return showToast("Out of Stock ❌");

    try {
      await dispatch(
        addToCart({ productId: product.id, quantity: 1 })
      ).unwrap();
      showToast("Added to cart ✅");
    } catch {
      showToast("Failed ❌");
    }
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  /* ================= FILTER + SORT ================= */
  const filteredProducts = useMemo(() => {
    return [...items]
      .filter((p) =>
        selectedCategory
          ? p.category?.toLowerCase() === selectedCategory.toLowerCase()
          : true
      )
      .filter((p) => Number(p.price) <= Number(maxPrice))
      .filter((p) => (ratingFilter ? (p.rating || 0) >= 4 : true))
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        return b.id - a.id;
      });
  }, [items, selectedCategory, maxPrice, ratingFilter, sort]);

  return (
    <div className="flex gap-10 flex-col lg:flex-row">

      {toast && (
        <div className="fixed top-20 right-6 bg-black text-white px-6 py-3 rounded-full shadow-2xl z-50">
          {toast}
        </div>
      )}

      <aside className="w-full lg:w-80 sticky top-24 h-fit">
        <div className="bg-white/80 backdrop-blur-xl border rounded-3xl shadow-xl p-6">

          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-bold">Filters</h3>
            <button
              onClick={() => {
                setMaxPrice(MAX_LIMIT);
                setRatingFilter(false);
              }}
              className="text-sm text-pink-500"
            >
              Clear
            </button>
          </div>

          <div className="mb-8">
            <p className="font-semibold mb-4">Max Price</p>
            <input
              type="range"
              min="0"
              max={MAX_LIMIT}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-pink-500"
            />
            <div className="text-sm mt-2 font-medium">
              ₹ {maxPrice}
            </div>
          </div>

          <label className="flex gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={ratingFilter}
              onChange={() => setRatingFilter(!ratingFilter)}
              className="accent-pink-500"
            />
            4 ⭐ & above
          </label>

        </div>
      </aside>

      <div className="flex-1">

        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold">
            {selectedCategory
              ? selectedCategory.toUpperCase()
              : "All Products"} ({filteredProducts.length})
          </h1>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-xl p-2"
          >
            <option value="latest">Newest</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center text-gray-400 text-lg py-20">
            No products found.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isUnavailable = product.stock === 0;

              return (
                <div
                  key={product.id}
                  className={`bg-white rounded-3xl shadow-lg overflow-hidden ${
                    isUnavailable ? "opacity-60" : "hover:shadow-2xl"
                  }`}
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="h-60 overflow-hidden">
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-100">
                          No Image
                        </div>
                      )}
                    </div>
                  </Link>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold">
                      {product.title}
                    </h3>

                    <p className="text-xl font-bold text-pink-600">
                      ₹ {product.price}
                    </p>

                    <button
                      disabled={isUnavailable}
                      onClick={() => handleAddToCart(product)}
                      className={`mt-4 w-full py-2 rounded-full ${
                        isUnavailable
                          ? "bg-gray-400 text-white"
                          : "bg-black text-white hover:bg-pink-500"
                      }`}
                    >
                      {isUnavailable ? "Out of Stock" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Products;