import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, fetchCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../api/axios";

import Stepper from "../components/checkout/Stepper";
import AddressForm from "../components/checkout/AddressForm";
import PaymentForm from "../components/checkout/PaymentForm";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.cart);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  /* 🔥 IMPORTANT FIX — Always fetch cart on load */
  useEffect(() => {
    if (status === "idle" || items.length === 0) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    addressLine: "",
  });

  const [payment, setPayment] = useState({
    method: "cod",
  });

  /* ✅ SAFE subtotal calculation */
  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => {
      return sum + (item.price || 0) * (item.quantity || 1);
    }, 0);
  }, [items]);

  const deliveryFee = subtotal >= 999 ? 0 : 49;
  const total = subtotal + deliveryFee;

  const validateAddress = () => {
    if (!address.name.trim()) return "Name required";
    if (!/^\d{10}$/.test(address.phone)) return "Valid 10-digit phone required";
    if (!/^\d{6}$/.test(address.pincode)) return "Valid 6-digit pincode required";
    if (!address.city.trim()) return "City required";
    if (!address.state.trim()) return "State required";
    if (!address.addressLine.trim()) return "Address required";
    return null;
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      toast.error("Cart is empty ❌");
      return;
    }

    const err = validateAddress();
    if (err) {
      toast.error(err);
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        shippingName: address.name,
        shippingPhone: address.phone,
        shippingAddress: address.addressLine,
        paymentMode: payment.method === "cod" ? "COD" : "ONLINE",
      });

      toast.success("Order Placed Successfully 🎉");

      dispatch(clearCart());

      setTimeout(() => {
        navigate("/orders");
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Order placement failed ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  /* 🔥 Prevent empty render during loading */
  if (status === "loading") {
    return (
      <div className="container py-20 text-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <Stepper currentStep={step} onStepClick={setStep} />

      <div className="grid lg:grid-cols-[1fr_360px] gap-6 mt-6">
        <div>

          {step === 0 && (
            <div className="bg-white border rounded-2xl p-5">
              <h2 className="font-bold">Cart Review</h2>

              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between border p-3 mt-3 rounded-xl"
                >
                  <span>{item.title}</span>
                  <span>
                    ₹ {item.price} x {item.quantity}
                  </span>
                </div>
              ))}

              <button
                onClick={() => setStep(1)}
                className="mt-5 w-full py-3 bg-black text-white rounded-xl"
              >
                Continue →
              </button>
            </div>
          )}

          {step === 1 && (
            <AddressForm
              value={address}
              onChange={setAddress}
              onNext={() => {
                const err = validateAddress();
                if (err) {
                  toast.error(err);
                  return;
                }
                setStep(2);
              }}
            />
          )}

          {step === 2 && (
            <PaymentForm
              value={payment}
              onChange={setPayment}
              onBack={() => setStep(1)}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <div className="bg-white border rounded-2xl p-5">
              <h2 className="font-bold mb-4">Review & Confirm</h2>

              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-3 bg-green-600 text-white rounded-xl"
              >
                {loading ? "Placing..." : "Place Order ✅"}
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border rounded-2xl p-5 h-fit">
          <h2 className="font-bold">Order Summary</h2>

          <div className="mt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>
                {deliveryFee === 0 ? "Free" : `₹ ${deliveryFee}`}
              </span>
            </div>

            <hr />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;