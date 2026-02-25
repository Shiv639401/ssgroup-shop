import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed); // ✅ simple syntax
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-black text-white">
      
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(246,211,101,0.18), transparent 40%), radial-gradient(circle at 90% 30%, rgba(79,70,229,0.10), transparent 40%)",
        }}
      />

      <div className="relative flex">
        <Sidebar collapsed={collapsed} onToggle={handleToggle} />

        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="p-4 md:p-6 lg:p-8">
            <Outlet />  {/* ✅ VERY IMPORTANT */}
          </main>
        </div>
      </div>
    </div>
  );
}