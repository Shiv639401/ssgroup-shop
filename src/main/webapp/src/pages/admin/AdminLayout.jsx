import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <div className="flex-1 p-6 md:p-10 bg-gradient-to-br from-black via-slate-950 to-black">
        <Outlet />
      </div>
    </div>
  );
}