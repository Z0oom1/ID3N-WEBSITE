import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  const [displayLoading, setDisplayLoading] = useState(isLoading);

  useEffect(() => {
    if (isLoading) {
      setDisplayLoading(true);
    } else {
      const timer = setTimeout(() => {
        setDisplayLoading(false);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    <AnimatePresence>
      {displayLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute top-[-50%] left-[-50%] w-full h-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-full"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            {/* Logo with Animation */}
            <motion.div
              className="relative"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <img
                src="/logo-id3n.png"
                alt="ID3N"
                className="w-24 h-24 object-contain drop-shadow-lg"
              />

              {/* Orbit Animation */}
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-primary border-r-accent rounded-full"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Carregando
              </h2>
              <motion.p
                className="text-foreground/60 text-sm"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Preparando a experiência...
              </motion.p>
            </motion.div>

            {/* Loading Bars */}
            <div className="flex gap-2">
              {[0, 1, 2, 3, 4].map((index) => (
                <motion.div
                  key={index}
                  className="w-1 h-8 bg-gradient-to-t from-primary to-accent rounded-full"
                  animate={{
                    scaleY: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.1,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Progress Indicator */}
            <motion.div
              className="w-64 h-1 bg-border/30 rounded-full overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          </div>

          {/* Floating Particles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary/40 rounded-full"
              animate={{
                x: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                y: [Math.random() * 400 - 200, Math.random() * 400 - 200],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                left: '50%',
                top: '50%',
                marginLeft: -2,
                marginTop: -2,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
