@echo off
echo =====================================================================
echo  GyanSetu (ज्ञानसेतु) - Digital Learning Platform for Rural Students
echo  Starting 3-Tier Decoupled Architecture:
echo   1. Python AI Microservice (Port 8000)
echo   2. Node.js Express Backend (Port 5000)
echo   3. React + Vite PWA Frontend (Port 5173)
echo =====================================================================

REM Start Python AI Microservice
start "GyanSetu Python AI Microservice (Port 8000)" cmd /k "cd /d %~dp0 && python ai-service/server.py"

REM Start Node.js Express Backend
start "GyanSetu Node.js Backend (Port 5000)" cmd /k "cd /d %~dp0server && node server.js"

REM Start Vite Frontend
start "GyanSetu React Vite Frontend (Port 5173)" cmd /k "cd /d %~dp0 && npm.cmd run dev -- --host 127.0.0.1 --port 5173"

echo All services are launching!
echo Frontend will be accessible at: http://127.0.0.1:5173/
pause
