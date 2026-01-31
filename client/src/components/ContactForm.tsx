import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, User, Building2, Briefcase, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { toast } from 'sonner';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    company: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const createLead = (trpc.leads as any).create.useMutation({
    onSuccess: () => {
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        cpf: '',
        company: '',
        service: '',
        message: '',
      });
      setErrors({});
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setTimeout(() => setSubmitSuccess(false), 5000);
    },
    onError: (error: any) => {
      toast.error('Erro ao enviar mensagem. Tente novamente.');
      console.error('Error:', error);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(\d{2}\)\s?\d{4,5}-?\d{4}$|^\d{10,11}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido';
    }

    if (!formData.cpf.trim()) {
      newErrors.cpf = 'CPF é obrigatório';
    } else if (!isValidCPF(formData.cpf)) {
      newErrors.cpf = 'CPF inválido';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Empresa é obrigatória';
    }

    if (!formData.service.trim()) {
      newErrors.service = 'Serviço é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidCPF = (cpf: string) => {
    const cleaned = cpf.replace(/\D/g, '');
    if (cleaned.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleaned)) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cleaned.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleaned.substring(10, 11))) return false;

    return true;
  };

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 11) {
      return cleaned
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return value;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCPF(value);
    } else if (name === 'phone') {
      formattedValue = formatPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Por favor, corrija os erros no formulário');
      return;
    }

    setIsSubmitting(true);

    try {
      await (createLead.mutateAsync as any)({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        company: formData.company,
        service: formData.service,
        message: formData.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Desenvolvimento Web',
    'Apps Móveis',
    'Consultoria',
    'Design UI/UX',
    'Manutenção',
    'Outro',
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden">
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
            Vamos Conversar?
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Preencha o formulário abaixo e entraremos em contato em breve
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-lg bg-green-500/10 border border-green-500/50 flex items-center gap-3 text-green-400"
              >
                <CheckCircle size={20} />
                <span>Mensagem enviada com sucesso!</span>
              </motion.div>
            )}

            {/* Name */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <User size={16} className="inline mr-2" />
                Nome Completo
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.name ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Mail size={16} className="inline mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.email ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.email}
                </p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Phone size={16} className="inline mr-2" />
                Telefone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.phone ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
                placeholder="(11) 99999-9999"
              />
              {errors.phone && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.phone}
                </p>
              )}
            </motion.div>

            {/* CPF */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                CPF
              </label>
              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.cpf ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
                placeholder="000.000.000-00"
              />
              {errors.cpf && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.cpf}
                </p>
              )}
            </motion.div>

            {/* Company */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Building2 size={16} className="inline mr-2" />
                Empresa
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.company ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
                placeholder="Nome da sua empresa"
              />
              {errors.company && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.company}
                </p>
              )}
            </motion.div>

            {/* Service */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Briefcase size={16} className="inline mr-2" />
                Serviço de Interesse
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg bg-card/50 border transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                  errors.service ? 'border-destructive' : 'border-border/50 hover:border-primary/50'
                }`}
              >
                <option value="">Selecione um serviço</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="text-destructive text-sm mt-1 flex items-center gap-1">
                  <AlertCircle size={14} />
                  {errors.service}
                </p>
              )}
            </motion.div>

            {/* Message */}
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MessageSquare size={16} className="inline mr-2" />
                Mensagem (Opcional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-card/50 border border-border/50 hover:border-primary/50 transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Conte-nos mais sobre seu projeto..."
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting || (createLead as any).isPending}
              className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting || (createLead as any).isPending ? 'Enviando...' : 'Enviar Mensagem'}
            </motion.button>
          </motion.form>

          {/* Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-6">
              <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Email</h3>
                    <p className="text-foreground/70">contato@id3n.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                    <a href="https://wa.me/5518996392316" className="text-primary hover:underline">
                      (18) 99639-2316
                    </a>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-xl border border-border/50 bg-card/50 hover:border-primary/50 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Building2 className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Localização</h3>
                    <p className="text-foreground/70">São Paulo, Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <p className="text-sm text-foreground/70 mb-2">
                ⏱️ Tempo de resposta
              </p>
              <p className="text-foreground font-semibold">
                Respondemos em até 2 horas
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
