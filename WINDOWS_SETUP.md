# 🪟 Guia de Inicialização - Windows

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18+): [https://nodejs.org/](https://nodejs.org/)
- **Git**: [https://git-scm.com/](https://git-scm.com/)

## 📥 Passo 1: Clonar o Repositório

Abra o **PowerShell** ou **CMD** e execute:

```bash
git clone https://github.com/Z0oom1/ID3N-WEBSITE.git
cd ID3N-WEBSITE
```

## 📦 Passo 2: Instalar pnpm

```bash
npm install -g pnpm
```

Verifique se foi instalado:
```bash
pnpm --version
```

## 🔧 Passo 3: Instalar Dependências

```bash
pnpm install
```

## ▶️ Passo 4: Iniciar o Servidor

### Opção 1: Usando PowerShell (Recomendado)

```bash
# No PowerShell, execute:
$env:NODE_ENV = "development"; pnpm run dev
```

Ou execute o script fornecido:
```bash
.\dev-windows.ps1
```

### Opção 2: Usando CMD

```bash
# No CMD, execute:
set NODE_ENV=development && pnpm run dev
```

Ou execute o script fornecido:
```bash
dev-windows.bat
```

### Opção 3: Usando npm (Alternativa)

Se os scripts acima não funcionarem, use:
```bash
npm run dev
```

## 🌐 Acessar o Site

Após iniciar o servidor, abra seu navegador em:

```
http://localhost:3000
```

Você verá:
- ✨ **Tela de Loading**: Animação cinematográfica com logo ID3N
- 🖱️ **Cursor Customizado**: Anel animado que muda de cor
- 🎨 **Site Completo**: Com todas as seções e animações

## 🛠️ Comandos Úteis

### Desenvolvimento
```bash
# Iniciar servidor com hot reload
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

## 🐛 Troubleshooting

### Problema: "pnpm: O termo 'pnpm' não é reconhecido"

**Solução:**
```bash
# Instale pnpm globalmente
npm install -g pnpm

# Ou use npm diretamente
npm run dev
```

### Problema: "Porta 3000 já está em uso"

**Solução 1:** Feche a aplicação que está usando a porta 3000

**Solução 2:** Use uma porta diferente
```bash
# No PowerShell
$env:PORT = "3001"; pnpm run dev

# No CMD
set PORT=3001 && pnpm run dev
```

### Problema: "Cannot find module"

**Solução:**
```bash
# Limpe e reinstale
rmdir node_modules -Force -Recurse
Remove-Item pnpm-lock.yaml
pnpm install
```

### Problema: Erro de permissão ao executar scripts PowerShell

Se receber erro ao executar `.\dev-windows.ps1`:

```bash
# Execute este comando uma vez
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Depois tente novamente
.\dev-windows.ps1
```

### Problema: Git não reconhecido

**Solução:** Reinstale Git de https://git-scm.com/ e reinicie o terminal

## 📚 Documentação Adicional

- **React**: [https://react.dev/](https://react.dev/)
- **Tailwind CSS**: [https://tailwindcss.com/](https://tailwindcss.com/)
- **Framer Motion**: [https://www.framer.com/motion/](https://www.framer.com/motion/)
- **pnpm**: [https://pnpm.io/](https://pnpm.io/)

## ✅ Checklist de Inicialização

- [ ] Node.js instalado (`node --version`)
- [ ] Git instalado (`git --version`)
- [ ] pnpm instalado (`pnpm --version`)
- [ ] Repositório clonado
- [ ] Dependências instaladas (`pnpm install`)
- [ ] Servidor iniciado (`pnpm dev`)
- [ ] Site acessível em `http://localhost:3000`
- [ ] Cursor customizado funcionando
- [ ] Loading screen exibida
- [ ] Todas as seções carregando

## 🚀 Deploy

Para publicar o site, você pode usar:

### Manus (Recomendado)
- Clique no botão "Publish" na interface Manus
- Site estará online em minutos

### Vercel
```bash
npm install -g vercel
vercel
```

### Railway
```bash
npm install -g @railway/cli
railway up
```

---

**Pronto para começar!** 🎉

Se tiver dúvidas, consulte o arquivo `GUIA_INICIO.md` ou abra uma issue no GitHub.
