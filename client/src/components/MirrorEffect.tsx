import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MirrorEffectProps {
  children: ReactNode;
  className?: string;
}

export default function MirrorEffect({ children, className = '' }: MirrorEffectProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Original */}
      <div className="relative z-10">{children}</div>

      {/* Mirror Reflection */}
      <motion.div
        className="absolute inset-x-0 top-full mt-2 opacity-20 pointer-events-none"
        style={{
          transform: 'scaleY(-1)',
          filter: 'blur(4px)',
        }}
      >
        {children}
      </motion.div>

      {/* Gradient Fade */}
      <div className="absolute inset-x-0 top-full h-32 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    </motion.div>
  );
}
