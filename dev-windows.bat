@echo off
REM Script para iniciar o servidor de desenvolvimento no Windows
REM Compatível com PowerShell e CMD

setlocal enabledelayedexpansion

echo.
echo ========================================
echo   ID3N Website - Servidor de Desenvolvimento
echo ========================================
echo.

REM Verificar se Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] Node.js não está instalado ou não está no PATH
    echo Baixe em: https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar se pnpm está instalado
pnpm --version >nul 2>&1
if errorlevel 1 (
    echo [ERRO] pnpm não está instalado
    echo Instale com: npm install -g pnpm
    pause
    exit /b 1
)

echo [OK] Node.js e pnpm detectados
echo.

REM Instalar dependências se necessário
if not exist "node_modules" (
    echo [INFO] Instalando dependências...
    call pnpm install
    if errorlevel 1 (
        echo [ERRO] Falha ao instalar dependências
        pause
        exit /b 1
    )
    echo [OK] Dependências instaladas
    echo.
)

REM Iniciar servidor
echo [INFO] Iniciando servidor de desenvolvimento...
echo [INFO] Acesse: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar o servidor
echo.

set NODE_ENV=development
call pnpm run dev

pause
