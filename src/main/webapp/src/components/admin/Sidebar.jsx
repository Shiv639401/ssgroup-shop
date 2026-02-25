import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  ShoppingBag,
  Users,
  Tag,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-black/60 backdrop-blur-xl border-r border-white/10 p-6 hidden md:block">
      <h2 className="text-xl font-bold mb-8 text-yellow-400">
        Admin Panel 🛠️
      </h2>

      <div className="space-y-3">

        <SidebarItem
          icon={<LayoutDashboard size={18} />}
          label="Dashboard"
          active={isActive("/admin")}
          onClick={() => navigate("/admin")}
        />

        <SidebarItem
          icon={<BarChart3 size={18} />}
          label="Performance"
          active={isActive("/admin/performance")}
          onClick={() => navigate("/admin/performance")}
        />

        <SidebarItem
          icon={<Boxes size={18} />}
          label="Manage Products"
          active={isActive("/admin/products")}
          onClick={() => navigate("/admin/products")}
        />

        <SidebarItem
          icon={<Tag size={18} />}
          label="Manage Deals"
          active={isActive("/admin/deals")}
          onClick={() => navigate("/admin/deals")}
        />

        <SidebarItem
          icon={<ShoppingBag size={18} />}
          label="Orders"
          active={isActive("/admin/orders")}
          onClick={() => navigate("/admin/orders")}
        />

        <SidebarItem
          icon={<Users size={18} />}
          label="Users"
          active={isActive("/admin/users")}
          onClick={() => navigate("/admin/users")}
        />

      </div>
    </div>
  );
}

const SidebarItem = ({ label, onClick, icon, active }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    onClick={onClick}
    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition duration-200 ${
      active
        ? "bg-yellow-400 text-black font-semibold shadow-lg"
        : "hover:bg-white/10 text-white"
    }`}
  >
    {icon}
    <span>{label}</span>
  </motion.div>
);