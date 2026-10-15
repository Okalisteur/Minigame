<#
.SYNOPSIS
    Installe les dépendances, build l'extension MIL Education et ouvre
    la page des extensions Chrome pour la charger.

.USAGE
    1. Dézippe mil-extension.zip
    2. Ouvre PowerShell dans le dossier mil-extension
    3. Exécute : .\setup.ps1
    (si l'exécution de scripts est bloquée, lance d'abord :
     Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass)
#>

$ErrorActionPreference = "Stop"

function Write-Step($msg) {
    Write-Host "`n==> $msg" -ForegroundColor Cyan
}

# 1. Vérifier Node.js
Write-Step "Vérification de Node.js..."
try {
    $nodeVersion = node -v
    Write-Host "Node.js détecté : $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Node.js n'est pas installé ou introuvable dans le PATH." -ForegroundColor Red
    Write-Host "Télécharge-le ici : https://nodejs.org/ (version LTS recommandée)" -ForegroundColor Yellow
    exit 1
}

# 2. Vérifier npm
try {
    $npmVersion = npm -v
    Write-Host "npm détecté : $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "npm est introuvable. Réinstalle Node.js." -ForegroundColor Red
    exit 1
}

# 3. Installer les dépendances
Write-Step "Installation des dépendances (npm install)..."
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "Échec de npm install." -ForegroundColor Red
    exit 1
}

# 4. Builder l'extension
Write-Step "Build de l'extension (npm run build)..."
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "Échec du build." -ForegroundColor Red
    exit 1
}

$distPath = Join-Path (Get-Location) "dist"

if (Test-Path $distPath) {
    Write-Step "Build terminé avec succès."
    Write-Host "Dossier généré : $distPath" -ForegroundColor Green
} else {
    Write-Host "Le dossier dist n'a pas été trouvé après le build." -ForegroundColor Red
    exit 1
}

# 5. Ouvrir la page des extensions Chrome
Write-Step "Ouverture de chrome://extensions ..."
try {
    Start-Process "chrome.exe" "chrome://extensions"
} catch {
    Write-Host "Impossible d'ouvrir Chrome automatiquement. Ouvre-le manuellement et va sur chrome://extensions" -ForegroundColor Yellow
}

Write-Host "`nÉtapes restantes dans Chrome :" -ForegroundColor Cyan
Write-Host "  1. Active le 'Mode développeur' (en haut à droite)"
Write-Host "  2. Clique sur 'Charger l'extension non empaquetée'"
Write-Host "  3. Sélectionne ce dossier : $distPath"
Write-Host "`nPour développer avec rechargement à chaud : npm run dev" -ForegroundColor Cyan
