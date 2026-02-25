// src/pages/admin/AdminOrderDetails.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import StatusPill from "../../components/admin/Orders/StatusPill";
import { fetchAdminOrderDetails, clearSelectedOrder } from "../../slices/orderSlice";

export default function AdminOrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ✅ FIX: selectedOrder (not selected)
  const { selectedOrder, selectedStatus, selectedError } = useSelector((s) => s.orders);

  useEffect(() => {
    dispatch(fetchAdminOrderDetails(id));
    return () => dispatch(clearSelectedOrder());
  }, [dispatch, id]);

  if (selectedStatus === "loading") {
    return <div className="text-white/60 p-10">Loading order details…</div>;
  }

  if (selectedStatus === "failed") {
    return <div className="text-red-400 p-10">{selectedError}</div>;
  }

  if (!selectedOrder) return null;

  const Card = ({ title, children }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <div className="text-white/70 text-sm">{title}</div>
      <div className="mt-2">{children}</div>
    </div>
  );

  return (
    <div className="min-h-screen text-white space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold text-yellow-400">Order #{selectedOrder.id}</div>
          <div className="text-white/60 text-sm mt-1">
            {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ""}
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
        >
          Back
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="Customer">
          <div className="font-semibold">{selectedOrder.customerName || "N/A"}</div>
          <div className="text-white/70">{selectedOrder.customerEmail || "-"}</div>
        </Card>

        <Card title="Payment">
          <div className="font-semibold">{selectedOrder.paymentMethod || "-"}</div>
          <div className="text-white/70">
            Total: ₹ {Number(selectedOrder.total || 0).toLocaleString("en-IN")}
          </div>
        </Card>

        <Card title="Status">
          <div className="flex items-center gap-3">
            <StatusPill status={selectedOrder.status} />
            <div className="text-white/70 text-sm">
              Tracking: {selectedOrder.trackingNumber || "-"}
            </div>
          </div>
        </Card>
      </div>

      <Card title="Address">
        <div className="text-white/80 whitespace-pre-line">
          {selectedOrder.address || selectedOrder.shippingAddress || "-"}
        </div>
      </Card>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
        <div className="flex items-center justify-between">
          <div className="text-white/70 text-sm">Order Items</div>
          <div className="text-white/60 text-sm">
            {selectedOrder.items?.length || 0} items
          </div>
        </div>

        <div className="mt-4 max-h-[360px] overflow-auto rounded-xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-white/70 sticky top-0">
              <tr>
                <th className="text-left p-3">Product</th>
                <th className="text-left p-3">Qty</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(selectedOrder.items || []).map((it, idx) => (
                <tr key={idx} className="border-t border-white/10">
                  <td className="p-3">{it.productName}</td>
                  <td className="p-3">{it.quantity}</td>
                  <td className="p-3">₹ {Number(it.price || 0).toLocaleString("en-IN")}</td>
                  <td className="p-3 font-semibold text-yellow-300">
                    ₹ {Number((it.price || 0) * (it.quantity || 1)).toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
              {(!selectedOrder.items || selectedOrder.items.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-white/60">
                    No items.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 flex justify-end">
          <div className="bg-black/40 border border-white/10 rounded-2xl px-5 py-3">
            <div className="text-white/60 text-xs">Order Total</div>
            <div className="text-xl font-bold text-yellow-400">
              ₹ {Number(selectedOrder.total || 0).toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}