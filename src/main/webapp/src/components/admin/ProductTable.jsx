import React from "react";
import { Button } from "../ui/Button";

export default function ProductTable({ items = [], onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border bg-white shadow-card overflow-hidden">
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-light">
            <tr className="text-left">
              <th className="p-3">Product</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Rating</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gray-100 overflow-hidden border">
                      {p.images?.[0] ? (
                        <img src={p.images[0]} className="h-full w-full object-cover" />
                      ) : null}
                    </div>
                    <div>
                      <p className="font-semibold text-primary">{p.title}</p>
                      <p className="text-xs text-muted">{p.categoryName}</p>
                    </div>
                  </div>
                </td>
                <td className="p-3">
                  <p className="font-semibold">₹ {p.price}</p>
                  <p className="text-xs text-muted line-through">₹ {p.mrp}</p>
                </td>
                <td className="p-3">
                  <span className={p.stock > 0 ? "text-green-700" : "text-red-600"}>
                    {p.stock > 0 ? `${p.stock} in stock` : "Out of stock"}
                  </span>
                </td>
                <td className="p-3">{p.rating ?? 0}</td>
                <td className="p-3 text-right space-x-2">
                  <Button variant="outline" onClick={() => onEdit(p)}>Edit</Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(p)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td className="p-6 text-center text-muted" colSpan={5}>
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}