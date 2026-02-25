import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  addToCart,
} from "../slices/cartSlice";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items = [], status, error, updating } = useSelector(
    (state) => state.cart
  );

  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  /* ================= QUANTITY HANDLERS ================= */

  const increaseQty = async (item) => {
    setUpdatingId(item.productId);
    try {
      await dispatch(
        addToCart({ productId: item.productId, quantity: 1 })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
    setUpdatingId(null);
  };

  const decreaseQty = async (item) => {
    setUpdatingId(item.productId);
    try {
      await dispatch(
        addToCart({ productId: item.productId, quantity: -1 })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
    setUpdatingId(null);
  };

  const handleRemove = async (productId) => {
    setUpdatingId(productId);
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (err) {
      console.error(err);
    }
    setUpdatingId(null);
  };

  /* ================= TOTAL ================= */

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* ================= LOADING ================= */

  if (status === "loading") {
    return (
      <div className="py-20 text-center text-lg">
        Loading cart...
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (status === "failed") {
    return (
      <div className="py-20 text-center text-red-500 text-lg">
        {error}
      </div>
    );
  }

  /* ================= EMPTY CART ================= */

  if (status === "succeeded" && items.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Your cart is empty 🛒
        </h2>
        <Link
          to="/products"
          className="bg-black text-white px-6 py-3 rounded-full hover:bg-pink-500 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  /* ================= MAIN CART ================= */

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-extrabold mb-10 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
        Your Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div
              key={item.productId}
              className="flex gap-6 bg-white rounded-3xl shadow-xl p-6 items-center"
            >
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-cover rounded-xl"
                />
              )}

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {item.title}
                </h3>

                <p className="text-pink-600 font-bold text-lg mt-1">
                  ₹ {item.price}
                </p>

                <div className="flex items-center gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => decreaseQty(item)}
                    disabled={updatingId === item.productId}
                    className="w-8 h-8 rounded-full bg-gray-200 disabled:opacity-50"
                  >
                    −
                  </button>

                  <span className="font-semibold text-lg">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQty(item)}
                    disabled={updatingId === item.productId}
                    className="w-8 h-8 rounded-full bg-gray-200 disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemove(item.productId)}
                disabled={updatingId === item.productId}
                className="text-red-500 font-semibold disabled:opacity-50"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-semibold">
              ₹ {totalPrice}
            </span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">
              Free
            </span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹ {totalPrice}</span>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-8 w-full bg-black text-white py-3 rounded-full hover:bg-pink-500 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;