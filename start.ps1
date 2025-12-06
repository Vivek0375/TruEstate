#!/usr/bin/env pwsh
# Quick start script for TruEstate Sales Management System

Write-Host "TruEstate - Quick Start" -ForegroundColor Cyan

$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-Host "Checking if backend/data/sales.csv exists..." -ForegroundColor Yellow
$csvPath = Join-Path $backendPath "data" "sales.csv"
if (-not (Test-Path $csvPath)) {
    Write-Host "WARNING: $csvPath not found!" -ForegroundColor Red
    Write-Host "Please download the dataset from Google Drive and place it at backend/data/sales.csv" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Starting backend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList @("-NoExit", "-Command", "cd '$backendPath'; npm install; npm start")

Start-Sleep -Seconds 3

Write-Host "Starting frontend..." -ForegroundColor Green
Start-Process -NoNewWindow -FilePath "powershell" -ArgumentList @("-NoExit", "-Command", "cd '$frontendPath'; npm install; npm run dev")

Write-Host ""
Write-Host "Backend: http://127.0.0.1:4000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Open frontend URL in your browser when ready." -ForegroundColor Yellow
