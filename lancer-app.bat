@echo off
echo ========================================
echo   dope-a-bit - Lancement de l'application
echo ========================================
echo.

REM Vérifier si Node.js est installé
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Node.js n'est pas installe ou n'est pas dans le PATH.
    echo.
    echo Veuillez installer Node.js depuis https://nodejs.org/
    echo Puis redemarrez ce script.
    echo.
    pause
    exit /b 1
)

echo [OK] Node.js detecte
node --version
npm --version
echo.

REM Vérifier si node_modules existe
if not exist "node_modules" (
    echo Installation des dependances...
    echo Cela peut prendre 1-2 minutes...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo [ERREUR] L'installation a echoue.
        pause
        exit /b 1
    )
    echo.
    echo [OK] Dependances installees
    echo.
)

echo Lancement du serveur de developpement...
echo.
echo L'application sera accessible sur http://localhost:5173
echo (ou un autre port si celui-ci est occupe)
echo.
echo Appuyez sur Ctrl+C pour arreter le serveur
echo.

call npm run dev

pause

