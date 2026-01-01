@echo off
echo Starting SoulConnect...

cd server
if not exist node_modules call npm install
start "SoulConnect Server" cmd /k "npm start"

cd ../client
if not exist node_modules call npm install
start "SoulConnect Client" cmd /k "npm run dev"

echo Application started! Server port 5000, Client port 5173.
