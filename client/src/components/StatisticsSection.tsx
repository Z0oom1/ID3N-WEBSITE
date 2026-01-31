import { motion } from 'framer-motion';
import Counter from './Counter';

export default function StatisticsSection() {
  const stats = [
    {
      value: 500,
      label: 'Projetos Entregues',
      icon: '🚀',
    },
    {
      value: 150,
      label: 'Clientes Satisfeitos',
      icon: '😊',
    },
    {
      value: 12,
      label: 'Anos de Expertise',
      icon: '⭐',
    },
    {
      value: 98,
      label: '% Taxa de Satisfação',
      icon: '✨',
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
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-3xl rounded-full" />
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
            Números que Falam
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Resultados comprovados através de anos de dedicação e excelência
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative"
            >
              {/* Card Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card Content */}
              <div className="relative p-8 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 group-hover:scale-105">
                <div className="text-4xl mb-4">{stat.icon}</div>

                <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                  <Counter end={stat.value} duration={2} suffix={stat.value === 98 ? '%' : '+'} />
                </div>

                <p className="text-foreground/70 font-medium">{stat.label}</p>

                {/* Animated Border */}
                <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/50 transition-all duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
