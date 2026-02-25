import React, { useMemo, useState } from "react";

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("desc");

  const specs = useMemo(() => {
    // Try best to show something even if backend doesn't give specs
    const arr = [];
    if (product?.brand) arr.push(["Brand", product.brand]);
    if (product?.category) arr.push(["Category", product.category]);
    if (product?.stock != null) arr.push(["Stock", String(product.stock)]);
    if (product?.sku) arr.push(["SKU", product.sku]);
    return arr;
  }, [product]);

  return (
    <div className="mt-6 rounded-2xl border bg-white shadow-card overflow-hidden">
      {/* Tabs header */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 text-sm font-semibold ${
            tab === "desc" ? "text-accent border-b-2 border-accent" : "text-primary"
          }`}
          onClick={() => setTab("desc")}
        >
          Description
        </button>
        <button
          className={`flex-1 py-3 text-sm font-semibold ${
            tab === "specs" ? "text-accent border-b-2 border-accent" : "text-primary"
          }`}
          onClick={() => setTab("specs")}
        >
          Specs
        </button>
        <button
          className={`flex-1 py-3 text-sm font-semibold ${
            tab === "reviews" ? "text-accent border-b-2 border-accent" : "text-primary"
          }`}
          onClick={() => setTab("reviews")}
        >
          Reviews
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {tab === "desc" && (
          <p className="text-sm text-muted leading-relaxed">
            {product?.description ||
              "Premium product with great build quality and excellent features."}
          </p>
        )}

        {tab === "specs" && (
          <div className="text-sm">
            {specs.length ? (
              <div className="space-y-2">
                {specs.map(([k, v]) => (
                  <div key={k} className="flex justify-between border-b pb-2">
                    <span className="text-muted">{k}</span>
                    <span className="font-semibold text-primary">{v}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted">No specs available.</p>
            )}
          </div>
        )}

        {tab === "reviews" && (
          <div className="text-sm text-muted space-y-3">
            <div className="rounded-xl border p-3">
              ⭐⭐⭐⭐☆ <span className="text-primary font-semibold">Great quality</span>
              <p className="mt-1">Looks premium and delivery was fast.</p>
            </div>
            <div className="rounded-xl border p-3">
              ⭐⭐⭐⭐⭐ <span className="text-primary font-semibold">Worth it</span>
              <p className="mt-1">Amazing value for money.</p>
            </div>
            <p className="text-xs">
              *Demo reviews. Day 12 pe real reviews API connect kar sakte hain.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
