import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LightEffects from '@/components/LightEffects';
import ParticleEffect from '@/components/ParticleEffect';
import StatisticsSection from '@/components/StatisticsSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProjectsSection3D from '@/components/ProjectsSection3D';
import ContactForm from '@/components/ContactForm';

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.3]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary overflow-hidden">
      {/* Light Effects */}
      <LightEffects />
      <ParticleEffect />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-72 h-72 bg-primary/10 blur-3xl rounded-full"
              animate={{
                y: [0, 30, 0],
                x: [0, 20, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute bottom-20 right-10 w-72 h-72 bg-accent/10 blur-3xl rounded-full"
              animate={{
                y: [0, -30, 0],
                x: [0, -20, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <motion.div
            className="relative z-10 text-center max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ scale: heroScale, opacity: heroOpacity }}
          >
            {/* Logo */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src="/logo-id3n.png"
                alt="ID3N"
                className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <span className="text-foreground">Arquitetando o</span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
                Futuro Digital
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Soluções minimalistas, performance máxima. Transformamos complexidade em simplicidade através de software de alta precisão.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.button
                className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniciar Projeto
                <ArrowRight size={20} />
              </motion.button>

              <motion.button
                className="px-8 py-4 rounded-full border-2 border-primary/50 text-foreground font-semibold hover:border-primary hover:bg-primary/5 transition-all"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Portfólio
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-primary/50" size={32} />
          </motion.div>
        </section>

        {/* Statistics Section */}
        <RevealOnScroll>
          <StatisticsSection />
        </RevealOnScroll>

        {/* Services Section */}
        <RevealOnScroll>
          <ServicesSection />
        </RevealOnScroll>

        {/* Projects 3D Section */}
        <RevealOnScroll>
          <ProjectsSection3D />
        </RevealOnScroll>

        {/* Contact Section */}
        <RevealOnScroll>
          <ContactForm />
        </RevealOnScroll>

        {/* Legacy Projects Carousel - Hidden but available */}
        <div className="hidden">
          <ProjectCarousel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
