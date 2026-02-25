import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, ShoppingBag, TrendingUp, Tag } from "lucide-react";
import { fetchAdminOrders } from "../../slices/orderSlice";
import { fetchDeals } from "../../slices/dealSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.items || []);
  const ordersState = useSelector((state) => state.orders);
  const deals = useSelector((state) => state.deals?.items || []);

  const orders = ordersState?.adminPage?.content || [];
  const status = ordersState?.adminStatus;

  useEffect(() => {
    dispatch(fetchAdminOrders());
    dispatch(fetchDeals());
  }, [dispatch]);

  const totalOrders = orders.length;

  const totalRevenue = useMemo(() => {
    if (!Array.isArray(orders)) return 0;

    return orders.reduce((sum, o) => {
      const amount =
        o.totalAmount ??
        o.total ??
        o.subtotal ??
        o.amount ??
        o.totalPrice ??
        0;

      return sum + Number(amount || 0);
    }, 0);
  }, [orders]);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-semibold text-yellow-400">
        Welcome Admin 👑
      </h1>

      {/* STATS */}
      <div className="grid gap-6 mt-10 md:grid-cols-4">
        <StatCard
          icon={<Boxes className="text-yellow-400" size={20} />}
          title="Total Products"
          value={products.length}
        />

        <StatCard
          icon={<ShoppingBag className="text-yellow-400" size={20} />}
          title="Total Orders"
          value={status === "loading" ? "..." : totalOrders}
        />

        <StatCard
          icon={<TrendingUp className="text-yellow-400" size={20} />}
          title="Total Revenue"
          value={status === "loading" ? "..." : `₹ ${totalRevenue}`}
        />

        <StatCard
          icon={<Tag className="text-yellow-400" size={20} />}
          title="Active Deals"
          value={deals.length}
        />
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-14">
        <h2 className="text-xl font-semibold text-white mb-6">
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
            onClick={() => navigate("/admin/deals")}
            className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition duration-300"
          >
            🏷 Manage Deals
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

const StatCard = ({ title, value, icon }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
  >
    <div className="flex items-center gap-3">
      {icon}
      <h3 className="text-sm text-white/60">{title}</h3>
    </div>

    <h2 className="text-3xl font-bold mt-3 text-yellow-400">
      {value}
    </h2>
  </motion.div>
);

export default AdminDashboard;