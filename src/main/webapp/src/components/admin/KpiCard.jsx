import React from "react";
import { motion } from "framer-motion";
import LiveCounter from "./LiveCounter";

const KpiCard = ({ icon, title, value, prefix = "", suffix = "", right }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon}
          <h3 className="text-sm text-white/60">{title}</h3>
        </div>
        {right}
      </div>

      <div className="text-3xl font-bold mt-3 text-yellow-400">
        <LiveCounter value={value} prefix={prefix} suffix={suffix} />
      </div>
    </motion.div>
  );
};

export default KpiCard;