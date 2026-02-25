import React, { useState } from "react";
import { toast } from "sonner";

export default function DeliveryCheck() {
  const [pincode, setPincode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const isValidPin = (pin) => /^[0-9]{6}$/.test(pin);

  const handleCheck = async () => {
    if (!isValidPin(pincode)) {
      toast.error("Enter valid 6-digit pincode ❌");
      return;
    }
    setLoading(true);
    setResult(null);

    // Fake API simulation (Day 12 pe real API bhi connect karwa dunga)
    setTimeout(() => {
      const fast = Number(pincode[pincode.length - 1]) % 2 === 0;
      const eta = fast ? "2-4 days" : "4-7 days";
      setResult({
        eta,
        cod: fast ? "Available" : "Available",
        returnDays: fast ? "14 days" : "7 days",
      });
      setLoading(false);
      toast.success("Delivery details updated ✅");
    }, 700);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-card p-4">
      <p className="font-semibold text-primary">Delivery</p>

      <div className="mt-3 flex gap-2">
        <input
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="Enter pincode"
          className="flex-1 border rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent"
        />
        <button
          onClick={handleCheck}
          disabled={loading}
          className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? "Checking..." : "Check"}
        </button>
      </div>

      {result && (
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Estimated delivery</span>
            <span className="font-semibold text-primary">{result.eta}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">COD</span>
            <span className="font-semibold text-primary">{result.cod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Return</span>
            <span className="font-semibold text-primary">{result.returnDays}</span>
          </div>
        </div>
      )}

      <p className="mt-3 text-xs text-muted">
        *This is demo delivery check. Day 12 pe real API connect karenge.
      </p>
    </div>
  );
}
