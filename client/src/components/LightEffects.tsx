import { useEffect, useRef } from 'react';
import { useScroll } from 'framer-motion';

export default function LightEffects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      if (!containerRef.current) return;

      const scrollProgress = latest / (document.documentElement.scrollHeight - window.innerHeight);
      
      // Atualizar posição dos feixes de luz
      const lights = containerRef.current.querySelectorAll('[data-light]');
      lights.forEach((light, index) => {
        const element = light as HTMLElement;
        const speed = 0.5 + index * 0.1;
        const yOffset = latest * speed;
        
        element.style.transform = `translateY(${yOffset}px)`;
        element.style.opacity = String(0.3 + Math.sin(scrollProgress * Math.PI) * 0.2);
      });

      // Atualizar brilho dos elementos
      const glowElements = containerRef.current.querySelectorAll('[data-glow]');
      glowElements.forEach((element) => {
        const el = element as HTMLElement;
        const glowIntensity = 0.5 + Math.sin(scrollProgress * Math.PI * 2) * 0.3;
        el.style.filter = `drop-shadow(0 0 ${20 * glowIntensity}px rgba(59, 130, 246, ${glowIntensity}))`;
      });
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Feixe de luz superior esquerdo */}
      <div
        data-light
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-transparent blur-3xl rounded-full"
        style={{
          filter: 'blur(80px)',
          opacity: 0.3,
        }}
      />

      {/* Feixe de luz central */}
      <div
        data-light
        className="absolute top-1/3 left-1/2 w-96 h-96 bg-gradient-to-br from-accent/15 to-transparent blur-3xl rounded-full -translate-x-1/2"
        style={{
          filter: 'blur(100px)',
          opacity: 0.2,
        }}
      />

      {/* Feixe de luz inferior direito */}
      <div
        data-light
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-primary/15 to-transparent blur-3xl rounded-full"
        style={{
          filter: 'blur(80px)',
          opacity: 0.25,
        }}
      />

      {/* Linha de luz horizontal */}
      <div
        data-light
        className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-xl"
        style={{
          opacity: 0.3,
        }}
      />

      {/* Efeito de luz radial no centro */}
      <div
        data-glow
        className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 bg-radial-gradient"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          opacity: 0.2,
        }}
      />
    </div>
  );
}
