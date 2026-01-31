import { motion } from 'framer-motion';
import { Code2, Smartphone, Zap, Shield, Palette, BarChart3 } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';
import { HoverCard } from './HoverCard';

export default function ServicesSection() {
  const services = [
    {
      icon: Code2,
      title: 'Desenvolvimento Web',
      description: 'Aplicações web modernas e responsivas com as melhores tecnologias do mercado.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: 'Apps Móveis',
      description: 'Aplicativos nativos e cross-platform para iOS e Android com excelente performance.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Performance',
      description: 'Otimização de velocidade e performance para melhor experiência do usuário.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Implementação de práticas de segurança de ponta para proteger seus dados.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Palette,
      title: 'Design UI/UX',
      description: 'Interfaces intuitivas e atraentes que proporcionam excelente experiência.',
      color: 'from-red-500 to-rose-500',
    },
    {
      icon: BarChart3,
      title: 'Analytics',
      description: 'Análise de dados e insights para tomar decisões mais informadas.',
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
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
            Nossos Serviços
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Soluções completas para transformar sua visão em realidade digital
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.div
                  variants={itemVariants}
                  className="group relative"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Card */}
                  <HoverCard className="relative h-full p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group-hover:scale-105 flex flex-col">
                  {/* Icon Container */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-foreground/70 text-sm leading-relaxed flex-grow mb-4">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <motion.a
                    href="#"
                    className="inline-flex items-center text-primary font-medium text-sm group/link"
                    whileHover={{ x: 4 }}
                  >
                    Saiba mais
                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </motion.a>

                    {/* Border Animation */}
                    <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
                  </HoverCard>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
