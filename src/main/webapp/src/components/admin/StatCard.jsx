import React from "react";
import { motion } from "framer-motion";

export default function StatCard({ title, value, hint, icon: Icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="glass rounded-2xl p-4 border gold-border shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs text-white/60">{title}</div>
          <div className="mt-1 text-2xl font-semibold text-white">{value}</div>
          {hint && <div className="mt-1 text-[11px] text-white/50">{hint}</div>}
        </div>

        <div className="h-10 w-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
          {Icon && <Icon className="h-5 w-5 text-white/80" />}
        </div>
      </div>
    </motion.div>
  );
}