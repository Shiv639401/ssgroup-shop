import React from "react";

export default function PaymentForm({ value, onChange, onNext, onBack }) {
  return (
    <div className="bg-white border rounded-2xl shadow-card p-5">
      <h2 className="text-lg font-bold text-primary">Payment Method</h2>
      <p className="text-sm text-muted mt-1">
        Select payment option.
      </p>

      <div className="mt-5 space-y-3">
        <label className="flex items-center gap-3 border rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            checked={value.method === "cod"}
            onChange={() => onChange({ ...value, method: "cod" })}
          />
          <div>
            <p className="font-semibold">Cash on Delivery</p>
            <p className="text-xs text-muted">Pay when product delivered</p>
          </div>
        </label>

        <label className="flex items-center gap-3 border rounded-2xl p-4 cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment"
            checked={value.method === "card"}
            onChange={() => onChange({ ...value, method: "card" })}
          />
          <div>
            <p className="font-semibold">Card / UPI (Demo)</p>
            <p className="text-xs text-muted">We will add gateway later</p>
          </div>
        </label>
      </div>

      {value.method === "card" && (
        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Card Number (demo)" />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="Name on Card (demo)" />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="MM/YY" />
          <input className="border rounded-xl px-3 py-2 text-sm" placeholder="CVV" />
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={onBack}
          className="flex-1 py-3 rounded-2xl border bg-white font-semibold hover:bg-gray-50 transition"
        >
          ← Back
        </button>
        <button
          onClick={onNext}
          className="flex-1 py-3 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition"
        >
          Continue to Review →
        </button>
      </div>
    </div>
  );
}
