@echo off
echo Starting BrandDesigner application on localhost:4400...
echo.

REM Start the client on port 4400
start "BrandDesigner Client" cmd /k "npm run dev:client -- --port 4400"

REM Wait a moment before starting the server
timeout /t 2 /nobreak >nul

REM Start the server
start "BrandDesigner Server" cmd /k "npm run dev"

echo.
echo Application started!
echo Client: http://localhost:4400
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill the processes when user presses a key
taskkill /FI "WindowTitle eq BrandDesigner Client*" /T /F >nul 2>&1
taskkill /FI "WindowTitle eq BrandDesigner Server*" /T /F >nul 2>&1

echo.
echo All servers stopped.
pause
