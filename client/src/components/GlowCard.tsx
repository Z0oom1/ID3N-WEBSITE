import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'primary' | 'accent' | 'success';
  delay?: number;
}

const glowColors = {
  primary: 'rgba(59, 130, 246, 0.3)',
  accent: 'rgba(168, 85, 247, 0.3)',
  success: 'rgba(34, 197, 94, 0.3)',
};

export default function GlowCard({
  children,
  className = '',
  glowColor = 'primary',
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02 }}
      className={`relative group ${className}`}
    >
      {/* Glow Background */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"
        style={{
          background: glowColors[glowColor],
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      />

      {/* Card Content */}
      <div className="relative z-10 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm group-hover:border-primary/50 transition-all duration-300">
        {children}
      </div>

      {/* Shine Effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-white/20 to-transparent rounded-2xl blur-2xl" />
      </motion.div>
    </motion.div>
  );
}
