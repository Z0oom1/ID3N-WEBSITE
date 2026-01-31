import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  type?: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'glowIn';
  className?: string;
}

const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  glowIn: {
    hidden: { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
};

export default function AnimatedElement({
  children,
  delay = 0,
  duration = 0.6,
  type = 'fadeUp',
  className = '',
}: AnimatedElementProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={animationVariants[type]}
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  );
}
