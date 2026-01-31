import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

interface Notebook3DProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  rotationX?: number;
  rotationY?: number;
  rotationZ?: number;
  scale?: number;
}

export default function Notebook3D({
  children,
  isOpen = false,
  rotationX = 0,
  rotationY = 0,
  rotationZ = 0,
  scale = 1,
}: Notebook3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const rotateYMotion = useMotionValue(0);
  const rotateZMotion = useMotionValue(0);

  // Transformar scroll em rotação e escala
  const scrollRotation = useTransform(scrollY, [0, 1000], [0, 45]);
  const scrollScale = useTransform(scrollY, [0, 1000], [0.8, 1.2]);
  const scrollOpacity = useTransform(scrollY, [0, 500, 1000], [0, 1, 0.5]);

  // Detectar mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering || !containerRef.current || isMobile) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      rotateYMotion.set(x * 20);
      rotateZMotion.set(y * 20);
      setMousePosition({ x: x * 20, y: y * 20 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering, rotateYMotion, rotateZMotion, isMobile]);

  // Mobile: Mostrar apenas o conteúdo sem 3D
  if (isMobile) {
    return (
      <motion.div
        className="w-full"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative w-full rounded-2xl overflow-hidden bg-black border-8 border-slate-700 shadow-2xl">
          {/* Conteúdo */}
          <div className="relative w-full overflow-hidden bg-gradient-to-br from-slate-900 to-black">
            {children}
          </div>
        </div>
      </motion.div>
    );
  }

  // Desktop: Mostrar notebook 3D
  return (
    <motion.div
      ref={containerRef}
      className="w-full h-screen flex items-center justify-center perspective"
      style={{
        perspective: '1200px',
        opacity: scrollOpacity,
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
        rotateYMotion.set(0);
        rotateZMotion.set(0);
      }}
    >
      <motion.div
        style={{
          rotateX: scrollRotation,
          scale: scrollScale,
          rotateY: rotateYMotion,
          rotateZ: rotateZMotion,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 30 }}
        className="w-full max-w-5xl"
      >
        {/* Notebook Body - Proporções 16:10 */}
        <div
          className="relative w-full rounded-3xl shadow-2xl overflow-hidden"
          style={{
            aspectRatio: '16 / 10',
            transformStyle: 'preserve-3d',
            transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(${rotationZ}deg) scale(${scale})`,
            transition: 'transform 0.6s ease-out',
          }}
        >
          {/* Notebook Base (Cinza Escuro) */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900 rounded-3xl border-8 border-slate-700">
            {/* Bezel (Borda da Tela) */}
            <div className="absolute inset-0 p-6 rounded-2xl bg-slate-900">
              {/* Tela do Notebook */}
              <div
                className="relative w-full h-full rounded-xl overflow-hidden bg-black"
                style={{
                  boxShadow: isOpen
                    ? 'inset 0 0 60px rgba(59, 130, 246, 0.4), 0 0 80px rgba(59, 130, 246, 0.3)'
                    : 'inset 0 0 30px rgba(0, 0, 0, 0.9)',
                }}
              >
                {/* Brilho da Tela */}
                {isOpen && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent pointer-events-none" />
                )}

                {/* Conteúdo */}
                <div className="relative w-full h-full overflow-hidden">
                  {children}
                </div>

                {/* Reflexo de Luz */}
                {isOpen && (
                  <div className="absolute top-0 left-0 w-2/5 h-1/3 bg-gradient-to-br from-white/25 to-transparent blur-3xl pointer-events-none" />
                )}
              </div>
            </div>
          </div>

          {/* Sombra Dinâmica */}
          <div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-5/6 h-12 bg-black/30 blur-3xl rounded-full"
            style={{
              opacity: isOpen ? 0.7 : 0.4,
            }}
          />

          {/* Teclado (Detalhe) */}
          <div className="absolute -bottom-12 left-0 right-0 h-12 bg-gradient-to-b from-slate-800 to-slate-900 rounded-b-3xl border-b-8 border-slate-700" />
        </div>
      </motion.div>
    </motion.div>
  );
}
