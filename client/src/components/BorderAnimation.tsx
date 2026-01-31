import { motion } from 'framer-motion';

interface BorderAnimationProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export default function BorderAnimation({ className = '', children, delay = 0 }: BorderAnimationProps) {
  return (
    <motion.div
      className={`relative group ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Animated Border Background */}
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-6 rounded-2xl bg-background border border-border/50 group-hover:border-primary/50 transition-all duration-300">
        {children}
      </div>
    </motion.div>
  );
}
