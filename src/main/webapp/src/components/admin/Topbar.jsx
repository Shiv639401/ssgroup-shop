import React from "react";

export default function Topbar() {
  return (
    <div className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div>
          <div className="text-sm text-white/60">Welcome back</div>
          <div className="text-lg font-semibold gold-text">Admin Dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="glass rounded-2xl px-3 py-2 text-xs text-white/80 border gold-border">
            Status: <span className="text-white">Live</span>
          </div>
          <div className="h-9 w-9 rounded-2xl glass border gold-border flex items-center justify-center">
            <span className="text-sm">A</span>
          </div>
        </div>
      </div>
    </div>
  );
}