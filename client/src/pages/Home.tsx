import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import LightEffects from '@/components/LightEffects';
import StatisticsSection from '@/components/StatisticsSection';
import ServicesSection from '@/components/ServicesSection';
import ProjectCarousel from '@/components/ProjectCarousel';
import ProjectsSection3D from '@/components/ProjectsSection3D';
import ContactForm from '@/components/ContactForm';

const RevealOnScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary">
      {/* Light Effects */}
      <LightEffects />

      {/* Background Gradients */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      <Header />

      <main className="relative z-10">
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden pt-20">
          <motion.div
            style={{ y: y1, opacity }}
            className="absolute inset-0 z-0 flex items-center justify-center opacity-20 pointer-events-none"
          >
            <div className="w-[800px] h-[800px] border border-border rounded-full animate-[spin_60s_linear_infinite]" />
            <div className="absolute w-[600px] h-[600px] border border-border/50 rounded-full animate-[spin_40s_linear_infinite_reverse]" />
          </motion.div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1 }}
              className="mb-12 inline-block"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-bold text-2xl md:text-3xl">ID3N</span>
              </div>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-8 leading-[1.1]"
            >
              Arquitetando o <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Futuro Digital
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            >
              Soluções minimalistas, performance máxima. Transformamos complexidade em simplicidade através de software de alta precisão.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.a
                href="#contact"
                className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 group shadow-xl shadow-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Iniciar Projeto
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="#projects"
                className="px-8 py-4 border border-border text-foreground font-medium rounded-full hover:bg-foreground/5 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explorar Portfólio
              </motion.a>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/50"
          >
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <ChevronDown className="animate-bounce" size={20} />
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
