import React from "react";

export default function Footer() {
  return (
    <div className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-8 text-sm text-slate-600 flex flex-col md:flex-row gap-2 justify-between">
        <div>© {new Date().getFullYear()} SSGroup Shop</div>
        <div className="flex gap-4">
          <span className="hover:text-pink-600 cursor-pointer">Contact</span>
          <span className="hover:text-pink-600 cursor-pointer">Privacy</span>
          <span className="hover:text-pink-600 cursor-pointer">Terms</span>
        </div>
      </div>
    </div>
  );
}
