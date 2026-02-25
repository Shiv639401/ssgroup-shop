import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

import {
  fetchProductById,
  clearSelectedProduct,
} from "../slices/productSlice";

import api from "../api/axios"; // ✅ IMPORTANT

import ImageGallery from "../components/productDetail/ImageGallery";
import DeliveryCheck from "../components/productDetail/DeliveryCheck";
import ProductTabs from "../components/productDetail/ProductTabs";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loadingCart, setLoadingCart] = useState(false);

  const { selectedProduct, status, error } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(id));
    return () => dispatch(clearSelectedProduct());
  }, [dispatch, id]);

  // ✅ FINAL BACKEND CONNECTED ADD TO CART
  const handleAddToCart = async () => {
    if (!selectedProduct) return;

    if (selectedProduct.stock === 0) {
      toast.error("Out of stock ❌");
      return;
    }

    try {
      setLoadingCart(true);

      await api.post("/cart", {
        productId: selectedProduct.id,
        quantity: 1,
      });

      toast.success("Added to cart ✅");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || "Failed to add to cart ❌"
      );
    } finally {
      setLoadingCart(false);
    }
  };

  // Loading
  if (status === "loading") {
    return (
      <div className="container py-10">
        <div className="h-8 w-48 bg-gray-200 rounded-xl animate-pulse mb-6" />
      </div>
    );
  }

  // Error
  if (status === "failed") {
    return (
      <div className="container py-10">
        <p className="text-red-600">
          {error || "Something went wrong ❌"}
        </p>
      </div>
    );
  }

  if (!selectedProduct) {
    return (
      <div className="container py-10">
        <p className="text-muted">No product found</p>
      </div>
    );
  }

  const images = selectedProduct.images || [];

  return (
    <div className="container py-10">
      <button
        onClick={() => navigate(-1)}
        className="text-sm font-semibold text-accent hover:underline"
      >
        ← Back
      </button>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ImageGallery images={images} title={selectedProduct.title} />

        <div>
          <h1 className="text-3xl font-bold text-primary">
            {selectedProduct.title}
          </h1>

          <p className="mt-3 text-2xl font-bold text-accent">
            ₹ {selectedProduct.price}
          </p>

          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={
                selectedProduct.stock === 0 || loadingCart
              }
              className={`flex-1 py-3 rounded-2xl font-semibold transition ${
                selectedProduct.stock === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:opacity-90"
              }`}
            >
              {loadingCart
                ? "Adding..."
                : selectedProduct.stock === 0
                ? "Out of Stock ❌"
                : "Add to Cart 🛒"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="flex-1 py-3 rounded-2xl border bg-white font-semibold hover:bg-gray-50 transition"
            >
              Go to Cart
            </button>
          </div>

          <ProductTabs product={selectedProduct} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;