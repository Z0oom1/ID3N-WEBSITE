# Script para iniciar o servidor de desenvolvimento no Windows PowerShell
# Uso: .\dev-windows.ps1

Write-Host ""
Write-Host "========================================"
Write-Host "  ID3N Website - Servidor de Desenvolvimento"
Write-Host "========================================"
Write-Host ""

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "[OK] Node.js $nodeVersion detectado"
} catch {
    Write-Host "[ERRO] Node.js não está instalado ou não está no PATH"
    Write-Host "Baixe em: https://nodejs.org/"
    Read-Host "Pressione Enter para sair"
    exit 1
}

# Verificar se pnpm está instalado
try {
    $pnpmVersion = pnpm --version
    Write-Host "[OK] pnpm $pnpmVersion detectado"
} catch {
    Write-Host "[ERRO] pnpm não está instalado"
    Write-Host "Instale com: npm install -g pnpm"
    Read-Host "Pressione Enter para sair"
    exit 1
}

Write-Host ""

# Instalar dependências se necessário
if (-not (Test-Path "node_modules")) {
    Write-Host "[INFO] Instalando dependências..."
    pnpm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERRO] Falha ao instalar dependências"
        Read-Host "Pressione Enter para sair"
        exit 1
    }
    Write-Host "[OK] Dependências instaladas"
    Write-Host ""
}

# Iniciar servidor
Write-Host "[INFO] Iniciando servidor de desenvolvimento..."
Write-Host "[INFO] Acesse: http://localhost:3000"
Write-Host ""
Write-Host "Pressione Ctrl+C para parar o servidor"
Write-Host ""

$env:NODE_ENV = "development"
pnpm run dev
