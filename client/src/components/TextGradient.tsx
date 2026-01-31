import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextGradientProps {
  children: ReactNode;
  className?: string;
}

export function TextGradient({ children, className = "" }: TextGradientProps) {
  return (
    <motion.span
      className={`bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      {children}
    </motion.span>
  );
}
