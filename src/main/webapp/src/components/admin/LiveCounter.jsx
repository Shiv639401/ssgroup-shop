import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const LiveCounter = ({ value = 0, prefix = "", suffix = "" }) => {
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 120, damping: 20 });
  const rounded = useTransform(spring, (latest) => Math.round(latest));

  React.useEffect(() => {
    mv.set(Number(value) || 0);
  }, [value, mv]);

  return (
    <motion.span>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
};

export default LiveCounter;