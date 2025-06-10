# Script para iniciar a aplicação StyleForge

Write-Host "Iniciando setup do StyleForge..." -ForegroundColor Green

# Setup do Backend
Write-Host "`nConfigurando o Backend..." -ForegroundColor Cyan
Set-Location backend
if (-not (Test-Path "venv")) {
    Write-Host "Criando ambiente virtual Python..."
    python -m venv venv
}
Write-Host "Ativando ambiente virtual..."
.\venv\Scripts\activate
Write-Host "Instalando dependências do Python..."
pip install -r requirements.txt
Write-Host "Executando migrações do banco de dados..."
python manage.py migrate
Write-Host "Iniciando servidor Django..."
Start-Process powershell -ArgumentList ".\venv\Scripts\activate; python manage.py runserver"

# Setup do Frontend
Write-Host "`nConfigurando o Frontend..." -ForegroundColor Cyan
Set-Location ..\frontend
Write-Host "Instalando dependências do Node.js..."
npm install
Write-Host "Iniciando servidor de desenvolvimento..."
Start-Process powershell -ArgumentList "npm start"

Write-Host "`nAplicação iniciada!" -ForegroundColor Green
Write-Host "Backend rodando em: http://localhost:8000"
Write-Host "Frontend rodando em: http://localhost:3000"
