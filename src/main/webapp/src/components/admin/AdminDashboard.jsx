import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { fetchProducts } from "../../slices/productSlice";
import { fetchAdminOrders } from "../../slices/orderSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items: products = [] } = useSelector(
    (state) => state.products
  );

  const { orders = [] } = useSelector(
    (state) => state.orders
  );

  // 🔥 Fetch data when dashboard loads
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAdminOrders());
  }, [dispatch]);

  // 🔥 Proper Revenue Calculation
  const totalRevenue = useMemo(() => {
    if (!Array.isArray(orders)) return 0;

    return orders.reduce((sum, order) => {
      const amount =
        order.totalAmount ??
        order.total ??
        order.grandTotal ??
        order.amount ??
        0;

      return sum + Number(amount);
    }, 0);
  }, [orders]);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-yellow-400">
        Welcome Admin 👑
      </h1>

      {/* STATS CARDS */}
      <div className="grid gap-6 mt-10 md:grid-cols-3">
        <StatCard title="Total Products" value={products.length} />
        <StatCard title="Total Orders" value={orders.length} />
        <StatCard title="Total Revenue" value={`₹ ${totalRevenue}`} />
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold mb-6">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-6">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 bg-yellow-400 text-black rounded-xl font-medium hover:scale-105 transition duration-300 shadow-lg"
          >
            ➕ Add New Product
          </button>

          <button
            onClick={() => navigate("/admin/orders")}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition duration-300"
          >
            📦 View Orders
          </button>

          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition duration-300"
          >
            👀 View Store
          </button>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
  >
    <h3 className="text-sm text-white/60">{title}</h3>
    <h2 className="text-3xl font-bold mt-3 text-yellow-400">
      {value}
    </h2>
  </motion.div>
);

export default AdminDashboard;