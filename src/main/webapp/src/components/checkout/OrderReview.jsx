import React from "react";

export default function OrderReview({ items, address, paymentMethod, total, onBack, onPlace }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-6">
      <h2 className="text-xl font-bold text-primary">Review & Place Order</h2>
      <p className="text-sm text-slate-600 mt-1">
        Confirm everything before placing the order.
      </p>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-4 py-3 bg-light font-semibold text-primary">
              Items ({items.length})
            </div>
            <div className="p-4 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between">
                  <div className="min-w-0">
                    <div className="font-semibold text-slate-800 truncate">
                      {it.title || it.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      Qty: {it.qty || 1}
                    </div>
                  </div>
                  <div className="font-bold text-primary">₹ {it.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Address + payment */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard title="Delivery Address">
              <p className="text-sm text-slate-700">
                {address.fullName} • {address.phone}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {address.address}, {address.city}, {address.state} - {address.pincode}
              </p>
            </InfoCard>

            <InfoCard title="Payment Method">
              <p className="text-sm text-slate-700 font-semibold">{paymentMethod}</p>
              <p className="text-xs text-slate-500 mt-1">Demo checkout (no real payment).</p>
            </InfoCard>
          </div>
        </div>

        {/* Total */}
        <div className="rounded-2xl border border-slate-200 p-4 h-fit">
          <div className="font-semibold text-primary">Price Details</div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Subtotal" value={`₹ ${total}`} />
            <Row label="Delivery" value="FREE" />
            <Row label="Discount" value="₹ 0" />
          </div>

          <div className="mt-4 border-t pt-4 flex items-center justify-between">
            <div className="font-bold text-primary">Total</div>
            <div className="font-extrabold text-primary">₹ {total}</div>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            <button
              onClick={onPlace}
              className="w-full px-5 py-3 rounded-xl bg-accent text-white font-bold hover:opacity-90 transition"
            >
              Place Order ✅
            </button>

            <button
              onClick={onBack}
              className="w-full px-5 py-3 rounded-xl border border-slate-200 font-semibold text-primary hover:bg-light transition"
            >
              ← Back
            </button>

            <p className="text-xs text-slate-500">
              By placing order, you agree to our terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">{label}</span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}

function InfoCard({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="text-sm font-bold text-primary">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );
}