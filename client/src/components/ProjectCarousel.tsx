import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

export default function ProjectCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: 'Controle de Identificacao para Alimentos Wilson',
      description: 'Sistema avancado de rastreamento e identificacao para alimentos, com controle de qualidade e conformidade regulatoria.',
      image: '🏷️',
      tags: ['React', 'Node.js', 'PostgreSQL', 'QR Code'],
      color: 'from-blue-500 to-cyan-500',
      link: 'https://awiden.netlify.app',
    },
    {
      title: 'App de Gestão de Projetos',
      description: 'Aplicativo mobile para gerenciamento de projetos com colaboração em tempo real e notificações push.',
      image: '📱',
      tags: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Dashboard Analítico',
      description: 'Dashboard executivo com visualizações de dados, relatórios customizáveis e exportação em múltiplos formatos.',
      image: '📊',
      tags: ['Vue.js', 'D3.js', 'Express', 'MongoDB'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Plataforma de Educação',
      description: 'LMS completo com cursos, videoaulas, quizzes interativos e certificação automática de usuários.',
      image: '🎓',
      tags: ['Next.js', 'Prisma', 'AWS', 'Stripe'],
      color: 'from-orange-500 to-red-500',
    },
    {
      title: 'Sistema de CRM',
      description: 'CRM enterprise com automação de vendas, pipeline de negócios e integração com múltiplos canais.',
      image: '💼',
      tags: ['Angular', 'C#', 'SQL Server', 'Azure'],
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section id="projects" className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Conheça alguns dos nossos projetos mais inovadores e impactantes
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <motion.div
                  className={`relative h-80 md:h-96 rounded-2xl bg-gradient-to-br ${projects[currentIndex].color} flex items-center justify-center overflow-hidden`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-9xl opacity-20">{projects[currentIndex].image}</div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                      {projects[currentIndex].title}
                    </h3>
                    <p className="text-foreground/70 text-lg leading-relaxed">
                      {projects[currentIndex].description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {projects[currentIndex].tags.map((tag, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/30"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <motion.a
                    href={projects[currentIndex].link || '#'}
                    target={projects[currentIndex].link ? '_blank' : '_self'}
                    rel={projects[currentIndex].link ? 'noopener noreferrer' : ''}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Projeto
                    <ExternalLink size={18} />
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-12">
            <motion.button
              onClick={prevSlide}
              className="p-3 rounded-lg bg-card border border-border/50 text-foreground hover:border-primary/50 hover:text-primary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>

            <div className="flex gap-2">
              {projects.map((_, index) => {
                const isActive = index === currentIndex;
                return (
                  <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'bg-primary w-8' : 'bg-border/50 w-2 hover:bg-border'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                  />
                );
              })}
            </div>

            <motion.button
              onClick={nextSlide}
              className="p-3 rounded-lg bg-card border border-border/50 text-foreground hover:border-primary/50 hover:text-primary transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          </div>

          <motion.div
            className="text-center mt-8 text-foreground/60 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Projeto {currentIndex + 1} de {projects.length}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
