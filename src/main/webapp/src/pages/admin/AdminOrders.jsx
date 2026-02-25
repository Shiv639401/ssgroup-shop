// src/pages/admin/AdminOrders.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import RevenueFilter from "../../components/admin/Orders/RevenueFilter";
import OrdersFilterBar from "../../components/admin/Orders/OrdersFilterBar";
import Pagination from "../../components/admin/Orders/Pagination";
import StatusPill from "../../components/admin/Orders/StatusPill";

import {
  fetchAdminOrders,
  setAdminFilters,
  updateOrderStatus,
} from "../../slices/orderSlice";

const STATUSES = ["CREATED", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function AdminOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { adminPage, adminStatus, adminError, filters } = useSelector(
    (s) => s.orders
  );

  useEffect(() => {
    dispatch(fetchAdminOrders(filters));
  }, [dispatch, filters]);

  const orders = adminPage?.content || [];
  const totalPages = adminPage?.totalPages || 0;
  const currentPage = adminPage?.number ?? filters.page;

  const onApplyFilters = (next) => {
    dispatch(setAdminFilters({ ...next, page: 0 }));
  };

  const onResetFilters = () => {
    dispatch(
      setAdminFilters({
        search: "",
        status: "ALL",
        from: "",
        to: "",
        page: 0,
        size: 10,
      })
    );
  };

  const onChangePage = (p) => {
    dispatch(setAdminFilters({ page: p }));
  };

  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ id: orderId, status: newStatus }));
    dispatch(fetchAdminOrders(filters));
  };

  return (
    <div className="min-h-screen text-white">
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-yellow-400">
          Orders Management 📦
        </h1>

        <RevenueFilter />

        <OrdersFilterBar
          initial={filters}
          onApply={onApplyFilters}
          onReset={onResetFilters}
        />

        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div>
              <div className="text-white font-semibold">Orders</div>
              <div className="text-white/60 text-sm">
                {adminStatus === "loading"
                  ? "Loading…"
                  : `Showing ${orders.length} orders`}
              </div>
            </div>
          </div>

          {adminStatus === "failed" && (
            <div className="p-6 text-red-400">{adminError}</div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-white/70">
                <tr>
                  <th className="text-left p-4">Order ID</th>
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Items</th>
                  <th className="text-left p-4">Total</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-left p-4">Tracking</th>
                  <th className="text-left p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((o) => (
                  <tr
                    key={o.id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-4 font-semibold">{o.id}</td>
                    <td className="p-4 text-white/70">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="p-4">{o.itemsCount ?? "-"}</td>
                    <td className="p-4 font-semibold text-yellow-300">
                      ₹ {Number(o.total || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleStatusChange(o.id, e.target.value)
                          }
                          className="rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-white outline-none focus:border-yellow-400"
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>

                        <StatusPill status={o.status} />
                      </div>
                    </td>

                    <td className="p-4 text-white/70">
                      {o.status === "SHIPPED" && o.trackingNumber
                        ? o.trackingNumber
                        : "-"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/orders/${o.id}`)}
                          className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleStatusChange(o.id, o.status)}
                          className="px-4 py-2 rounded-xl bg-yellow-400 text-black font-semibold hover:opacity-90 transition"
                        >
                          Update
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {adminStatus === "succeeded" && orders.length === 0 && (
                  <tr>
                    <td className="p-8 text-center text-white/60" colSpan={7}>
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <Pagination page={currentPage} totalPages={totalPages} onChange={onChangePage} />
      </div>
    </div>
  );
}