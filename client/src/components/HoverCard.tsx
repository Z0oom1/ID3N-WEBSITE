import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
}

export function HoverCard({ children, className = "" }: HoverCardProps) {
  return (
    <motion.div
      className={`rounded-lg border border-white/10 bg-white/5 backdrop-blur-md transition-all ${className}`}
      whileHover={{
        borderColor: "rgba(59, 130, 246, 0.5)",
        boxShadow: "0 0 30px rgba(59, 130, 246, 0.1)",
        y: -5,
      }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
