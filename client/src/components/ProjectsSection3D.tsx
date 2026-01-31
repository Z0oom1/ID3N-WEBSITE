import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Notebook3D from './Notebook3D';

export default function ProjectsSection3D() {
  const [currentProject, setCurrentProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: 'Controle de Identificacao para Alimentos Wilson',
      description: 'Sistema avancado de rastreamento e identificacao para alimentos',
      color: 'from-blue-600 to-cyan-600',
      features: ['React', 'Node.js', 'PostgreSQL', 'QR Code'],
      url: 'https://awiden.netlify.app',
    },
    {
      id: 2,
      title: 'App de Gestão',
      description: 'Gerenciamento de projetos com colaboração em tempo real',
      color: 'from-purple-600 to-pink-600',
      features: ['React Native', 'Firebase', 'Redux'],
    },
    {
      id: 3,
      title: 'Dashboard Analítico',
      description: 'Visualizações de dados e relatórios customizáveis',
      color: 'from-green-600 to-emerald-600',
      features: ['Vue.js', 'D3.js', 'Express'],
    },
    {
      id: 4,
      title: 'Plataforma Educação',
      description: 'LMS com cursos, videoaulas e certificação automática',
      color: 'from-orange-600 to-red-600',
      features: ['Next.js', 'Prisma', 'AWS'],
    },
  ];

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const project = projects[currentProject];

  return (
    <section id="projects-3d" className="relative min-h-screen flex flex-col items-center justify-center py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Experiência imersiva dos nossos melhores trabalhos
          </p>
        </motion.div>

        {/* 3D Notebook Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center min-h-[600px]">
          {/* Notebook 3D */}
          <div className="lg:col-span-2">
            <Notebook3D isOpen={true} rotationX={-15} rotationY={-20} scale={1}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentProject}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full bg-white flex flex-col items-center justify-center overflow-hidden"
                >
                  {/* Exibir site em iframe */}
                  {project.url ? (
                    <iframe
                      src={project.url}
                      title={project.title}
                      className="w-full h-full border-0"
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
                    />
                  ) : (
                    <motion.div
                      className="text-center text-white"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                      <p className="text-lg opacity-90 mb-8 max-w-xs mx-auto">{project.description}</p>

                      {/* Features */}
                      <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {project.features.map((feature, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm"
                          >
                            {feature}
                          </motion.span>
                        ))}
                      </div>

                      {/* CTA */}
                      <motion.button
                        className="px-6 py-2 rounded-lg bg-white text-slate-900 font-semibold hover:bg-white/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Ver Projeto Completo
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </Notebook3D>
          </div>

          {/* Controles e Info */}
          <div className="flex flex-col gap-8">
            {/* Info Card */}
            <motion.div
              className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-foreground mb-2">{project.title}</h3>
              <p className="text-foreground/70 mb-6">{project.description}</p>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-foreground/60 mb-2">Tecnologias</p>
                  <div className="flex flex-wrap gap-2">
                    {project.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={prevProject}
                className="flex-1 p-3 rounded-lg bg-card border border-border/50 text-foreground hover:border-primary/50 hover:text-primary transition-all flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft size={20} />
                <span className="hidden sm:inline">Anterior</span>
              </motion.button>

              <motion.button
                onClick={nextProject}
                className="flex-1 p-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all flex items-center justify-center gap-2 font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="hidden sm:inline">Próximo</span>
                <ChevronRight size={20} />
              </motion.button>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              className="text-center text-foreground/60 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Projeto {currentProject + 1} de {projects.length}
            </motion.div>

            {/* Dots */}
            <div className="flex gap-2 justify-center">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentProject(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentProject ? 'bg-primary w-8' : 'bg-border/50 w-2 hover:bg-border'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
