import React from "react";

export default function AddressForm({ value, onChange, onNext }) {
  const update = (patch) => onChange({ ...value, ...patch });

  return (
    <div className="bg-white border rounded-2xl shadow-card p-5">
      <h2 className="text-lg font-bold text-primary">Delivery Address</h2>
      <p className="text-sm text-muted mt-1">
        Fill correct address for smooth delivery.
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-5">
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="Full Name"
          value={value.name}
          onChange={(e) => update({ name: e.target.value })}
        />
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="Phone"
          value={value.phone}
          onChange={(e) => update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
        />
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="Pincode"
          value={value.pincode}
          onChange={(e) => update({ pincode: e.target.value.replace(/\D/g, "").slice(0, 6) })}
        />
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="City"
          value={value.city}
          onChange={(e) => update({ city: e.target.value })}
        />
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="State"
          value={value.state}
          onChange={(e) => update({ state: e.target.value })}
        />
        <input
          className="border rounded-xl px-3 py-2 text-sm"
          placeholder="Landmark (optional)"
          value={value.landmark}
          onChange={(e) => update({ landmark: e.target.value })}
        />
      </div>

      <textarea
        className="border rounded-xl px-3 py-2 text-sm w-full mt-4"
        placeholder="Full Address"
        rows={3}
        value={value.addressLine}
        onChange={(e) => update({ addressLine: e.target.value })}
      />

      <button
        onClick={onNext}
        className="mt-5 w-full py-3 rounded-2xl bg-primary text-white font-semibold hover:opacity-90 transition"
      >
        Continue to Payment →
      </button>
    </div>
  );
}
