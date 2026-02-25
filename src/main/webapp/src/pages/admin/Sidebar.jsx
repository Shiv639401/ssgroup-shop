import { NavLink } from "react-router-dom";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/categories", label: "Categories" },
  { to: "/admin/banners", label: "Banners" },
  { to: "/admin/bulk", label: "Bulk Upload" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="font-bold text-xl mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-black text-white" : "hover:bg-gray-100"}`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
