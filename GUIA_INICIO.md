# 🚀 Guia de Inicialização - ID3N Website

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18+): [https://nodejs.org/](https://nodejs.org/)
- **pnpm** (gerenciador de pacotes): `npm install -g pnpm`
- **Git**: [https://git-scm.com/](https://git-scm.com/)

## 📥 Passo 1: Clonar o Repositório

```bash
git clone https://github.com/Z0oom1/ID3N-WEBSITE.git
cd ID3N-WEBSITE
```

## 📦 Passo 2: Instalar Dependências

```bash
pnpm install
```

Este comando instalará todas as dependências do projeto (React, Tailwind CSS, Framer Motion, etc.).

## 🔧 Passo 3: Configurar Variáveis de Ambiente

O projeto usa variáveis de ambiente automaticamente injetadas pela plataforma Manus. Se estiver rodando localmente, crie um arquivo `.env.local` na raiz do projeto:

```env
# Autenticação OAuth
VITE_APP_ID=seu_app_id
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
OAUTH_SERVER_URL=https://api.manus.im

# Banco de Dados
DATABASE_URL=mysql://usuario:senha@localhost:3306/id3n

# Segurança
JWT_SECRET=sua_chave_secreta_aqui

# APIs Internas
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sua_chave_api
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=sua_chave_frontend
```

## ▶️ Passo 4: Iniciar o Servidor de Desenvolvimento

```bash
pnpm dev
```

O servidor iniciará em `http://localhost:3000`

Você verá:
- **Tela de Loading**: Animação cinematográfica com logo ID3N
- **Cursor Customizado**: Anel animado que muda de cor ao passar sobre elementos
- **Site Completo**: Com todas as seções, animações e efeitos visuais

## 🏗️ Estrutura do Projeto

```
id3n-new/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── components/       # Componentes reutilizáveis
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── CustomCursor.tsx
│   │   │   ├── LoadingScreen.tsx
│   │   │   ├── Notebook3D.tsx
│   │   │   ├── ProjectsSection3D.tsx
│   │   │   ├── StatisticsSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   └── ...
│   │   ├── pages/           # Páginas principais
│   │   │   └── Home.tsx
│   │   ├── App.tsx          # Componente raiz
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Estilos globais
│   ├── public/              # Arquivos estáticos
│   │   └── logo-id3n.png
│   └── index.html
├── server/                  # Backend Express + tRPC
│   ├── routers.ts          # Procedimentos tRPC
│   ├── db.ts               # Helpers de banco de dados
│   ├── whatsapp.ts         # Integração WhatsApp
│   └── _core/              # Framework interno
├── drizzle/                # Schema do banco de dados
│   └── schema.ts
├── package.json
└── README.md
```

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
pnpm dev

# Verificar tipos TypeScript
pnpm check

# Formatar código
pnpm format

# Executar testes
pnpm test
```

### Produção
```bash
# Build para produção
pnpm build

# Iniciar servidor de produção
pnpm start
```

### Banco de Dados
```bash
# Gerar migrações
pnpm drizzle-kit generate

# Aplicar migrações
pnpm drizzle-kit migrate
```

## 🎨 Principais Funcionalidades

### ✨ Cursor Customizado
- Anel animado que segue o mouse
- Muda de cor (azul → roxo) ao passar sobre elementos interativos
- Efeito glow suave

### 📱 Tela de Loading
- Logo ID3N com animação de órbita
- Barras de progresso dinâmicas
- Partículas flutuantes
- Transição suave ao carregar

### 🎬 Animações Cinematográficas
- Efeitos de luz sincronizados com scroll
- Notebook 3D interativo (desktop)
- Microanimações em cards e elementos
- Transições suaves entre seções

### 📱 Responsividade
- Design totalmente responsivo (mobile, tablet, desktop)
- Notebook 3D desabilitado em celulares
- Conteúdo otimizado para cada dispositivo

### 🔐 Autenticação
- Login OAuth via Manus
- Sistema de usuários integrado
- Proteção de rotas autenticadas

### 📝 Formulário de Contato
- Validação completa de campos (nome, email, telefone, CPF, empresa, serviço)
- Integração com WhatsApp (número: 18 996392316)
- Armazenamento de leads no banco de dados

## 🔌 Integração com WhatsApp

O formulário de contato envia automaticamente mensagens para o WhatsApp. Para configurar com API:

1. Obtenha credenciais da Twilio ou similar
2. Adicione ao `.env.local`:
```env
WHATSAPP_API_URL=sua_url_api
WHATSAPP_API_KEY=sua_chave_api
WHATSAPP_PHONE_NUMBER=5518996392316
```

## 🚀 Deploy

### Opção 1: Manus (Recomendado)
O projeto está pronto para deploy na plataforma Manus:
1. Clique no botão "Publish" na interface Manus
2. Configure domínio customizado se desejar
3. Site estará online em minutos

### Opção 2: Vercel
```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Opção 3: Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Deploy
railway up
```

## 🐛 Troubleshooting

### Problema: "Module not found"
```bash
# Solução: Reinstalar dependências
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Problema: Porta 3000 já em uso
```bash
# Solução: Usar porta diferente
PORT=3001 pnpm dev
```

### Problema: Banco de dados não conecta
```bash
# Verificar conexão
pnpm drizzle-kit push
```

## 📚 Documentação Adicional

- **React**: [https://react.dev/](https://react.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **Framer Motion**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **tRPC**: [https://trpc.io/](https://trpc.io/)
- **Drizzle ORM**: [https://orm.drizzle.team/](https://orm.drizzle.team/)

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs: `tail -f .manus-logs/devserver.log`
2. Consulte a documentação oficial do framework
3. Abra uma issue no repositório GitHub

## ✅ Checklist de Inicialização

- [ ] Node.js e pnpm instalados
- [ ] Repositório clonado
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Variáveis de ambiente configuradas
- [ ] Servidor iniciado (`pnpm dev`)
- [ ] Site acessível em `http://localhost:3000`
- [ ] Cursor customizado funcionando
- [ ] Loading screen exibida
- [ ] Todas as seções carregando corretamente

---

**Pronto para começar!** 🎉

Se tiver dúvidas, consulte o arquivo `README.md` ou entre em contato com o suporte.
