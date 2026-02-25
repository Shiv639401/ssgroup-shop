import React from "react";
import { Button } from "../ui/Button";

const emptyVariant = () => ({
  sku: "",
  mrp: "",
  price: "",
  stock: 0,
  isActive: true,
  options: [{ name: "Color", value: "" }, { name: "Size", value: "" }],
});

export default function VariantEditor({ value = [], onChange }) {
  const addVariant = () => onChange([...(value || []), emptyVariant()]);

  const updateVariant = (i, patch) => {
    const next = [...value];
    next[i] = { ...next[i], ...patch };
    onChange(next);
  };

  const removeVariant = (i) => {
    const next = [...value];
    next.splice(i, 1);
    onChange(next);
  };

  const updateOption = (vi, oi, patch) => {
    const next = [...value];
    const options = [...(next[vi].options || [])];
    options[oi] = { ...options[oi], ...patch };
    next[vi] = { ...next[vi], options };
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-primary">Variants</p>
        <Button type="button" variant="outline" onClick={addVariant}>+ Add Variant</Button>
      </div>

      {value.length === 0 && (
        <div className="rounded-xl border p-4 text-sm text-muted">
          No variants added. (Optional) Add Color/Size variants for premium product.
        </div>
      )}

      <div className="space-y-3">
        {value.map((v, i) => (
          <div key={i} className="rounded-2xl border p-4 bg-white">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Variant #{i + 1}</p>
              <button type="button" className="text-sm text-red-600" onClick={() => removeVariant(i)}>
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-3">
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="SKU (unique)"
                value={v.sku}
                onChange={(e) => updateVariant(i, { sku: e.target.value })}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="MRP"
                value={v.mrp}
                onChange={(e) => updateVariant(i, { mrp: e.target.value })}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Price"
                value={v.price}
                onChange={(e) => updateVariant(i, { price: e.target.value })}
              />
              <input
                className="border rounded-xl px-3 py-2"
                placeholder="Stock"
                type="number"
                value={v.stock}
                onChange={(e) => updateVariant(i, { stock: Number(e.target.value) })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
              {(v.options || []).map((op, oi) => (
                <div key={oi} className="grid grid-cols-2 gap-2">
                  <input
                    className="border rounded-xl px-3 py-2"
                    value={op.name}
                    onChange={(e) => updateOption(i, oi, { name: e.target.value })}
                  />
                  <input
                    className="border rounded-xl px-3 py-2"
                    placeholder="value"
                    value={op.value}
                    onChange={(e) => updateOption(i, oi, { value: e.target.value })}
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 mt-3">
              <input
                type="checkbox"
                checked={!!v.isActive}
                onChange={(e) => updateVariant(i, { isActive: e.target.checked })}
              />
              <span className="text-sm text-muted">Active</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}