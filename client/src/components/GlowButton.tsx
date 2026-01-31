import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlowButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  glowColor?: string;
}

export default function GlowButton({
  children,
  onClick,
  className = '',
  glowColor = 'from-primary to-accent',
}: GlowButtonProps) {
  return (
    <motion.div
      className="relative group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow Background */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${glowColor} rounded-lg blur-lg opacity-0 group-hover:opacity-75 transition-opacity duration-300`}
        animate={{
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.3)',
            '0 0 40px rgba(59, 130, 246, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Button */}
      <button
        onClick={onClick}
        className={`relative px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${glowColor} backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 ${className}`}
      >
        {children}
      </button>
    </motion.div>
  );
}
