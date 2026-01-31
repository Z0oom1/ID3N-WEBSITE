import { motion } from 'framer-motion';

export default function WaveEffect() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-2 border-primary/20 rounded-full"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeOut',
          }}
          style={{
            left: '50%',
            top: '50%',
            x: '-50%',
            y: '-50%',
          }}
        />
      ))}
    </div>
  );
}
