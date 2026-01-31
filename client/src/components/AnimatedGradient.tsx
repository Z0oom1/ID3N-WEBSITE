import { motion } from 'framer-motion';

interface AnimatedGradientProps {
  className?: string;
  duration?: number;
}

export default function AnimatedGradient({ className = '', duration = 8 }: AnimatedGradientProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none ${className}`}
      animate={{
        background: [
          'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
          'linear-gradient(225deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
          'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
