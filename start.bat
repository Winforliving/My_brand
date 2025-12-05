@echo off
echo Starting BrandDesigner application on localhost:4400...
echo.

REM Check if already running to prevent multiple instances
tasklist /FI "WindowTitle eq BrandDesigner*" 2>NUL | find /I /N "cmd.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo Application is already running!
    pause
    exit /b
)

REM Start both client and server in a single terminal using concurrently
start "BrandDesigner" cmd /k "npm run dev:all"

echo.
echo Application started!
echo Client: http://localhost:4400
echo.
echo Press any key to stop all servers...
pause >nul

REM Kill the processes when user presses a key
taskkill /FI "WindowTitle eq BrandDesigner*" /T /F >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1

echo.
echo All servers stopped.
pause
