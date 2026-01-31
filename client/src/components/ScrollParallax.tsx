import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollParallaxProps {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}

export function ScrollParallax({
  children,
  offset = 50,
  className = "",
}: ScrollParallaxProps) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
