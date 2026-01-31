import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Produto',
      links: [
        { label: 'Recursos', href: '#' },
        { label: 'Preços', href: '#' },
        { label: 'Segurança', href: '#' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Carreiras', href: '#' },
        { label: 'Contato', href: '#contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidade', href: '#' },
        { label: 'Termos', href: '#' },
        { label: 'Cookies', href: '#' },
        { label: 'Licença', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="relative bg-card/50 border-t border-border/50 backdrop-blur-xl">
      {/* Background Gradient */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-white font-bold">ID3N</span>
                </div>
                <span className="font-bold text-lg text-foreground">ID3N</span>
              </div>
              <p className="text-foreground/70 text-sm mb-6 max-w-xs">
                Arquitetando o futuro digital com soluções minimalistas e performance máxima.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:contato@id3n.com"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  <Mail size={16} />
                  contato@id3n.com
                </a>
                <a
                  href="tel:+5518996392316"
                  className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors text-sm"
                >
                  <Phone size={16} />
                  (18) 99639-2316
                </a>
                <div className="flex items-center gap-2 text-foreground/70 text-sm">
                  <MapPin size={16} />
                  São Paulo, Brasil
                </div>
              </div>
            </motion.div>

            {/* Links Sections */}
            {footerLinks.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-foreground/70 hover:text-primary transition-colors text-sm"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-border/50 my-12" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <motion.p
              className="text-foreground/60 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © {currentYear} ID3N. Todos os direitos reservados.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-lg bg-card border border-border/50 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/50 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
