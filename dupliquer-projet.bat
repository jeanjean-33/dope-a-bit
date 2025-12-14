@echo off
echo ========================================
echo   Duplication du projet dope-a-bit
echo ========================================
echo.

set /p NEW_FOLDER="Entrez le nom du nouveau dossier (ex: dope-a-bit-copy): "

if "%NEW_FOLDER%"=="" (
    echo [ERREUR] Vous devez entrer un nom de dossier.
    pause
    exit /b 1
)

set PARENT_DIR=%~dp0
set NEW_PATH=%PARENT_DIR%%NEW_FOLDER%

if exist "%NEW_PATH%" (
    echo [ERREUR] Le dossier "%NEW_FOLDER%" existe deja.
    set /p OVERWRITE="Voulez-vous le supprimer et le recreer ? (O/N): "
    if /i not "%OVERWRITE%"=="O" (
        echo Operation annulee.
        pause
        exit /b 1
    )
    echo Suppression de l'ancien dossier...
    rmdir /s /q "%NEW_PATH%"
)

echo.
echo Creation du nouveau dossier...
mkdir "%NEW_PATH%"
echo.

echo Copie des fichiers...
echo.

REM Copier les fichiers et dossiers importants
xcopy /E /I /Y "src" "%NEW_PATH%\src" >nul
xcopy /E /I /Y "public" "%NEW_PATH%\public" >nul
xcopy /E /I /Y ".github" "%NEW_PATH%\.github" >nul 2>&1

REM Copier les fichiers de configuration
copy /Y "package.json" "%NEW_PATH%\" >nul
copy /Y "package-lock.json" "%NEW_PATH%\" >nul 2>&1
copy /Y "vite.config.js" "%NEW_PATH%\" >nul
copy /Y "tailwind.config.js" "%NEW_PATH%\" >nul
copy /Y "postcss.config.js" "%NEW_PATH%\" >nul
copy /Y "index.html" "%NEW_PATH%\" >nul
copy /Y ".gitignore" "%NEW_PATH%\" >nul
copy /Y "README.md" "%NEW_PATH%\" >nul
copy /Y "DEPLOIEMENT.md" "%NEW_PATH%\" >nul 2>&1
copy /Y "QUICK_START_DEPLOY.md" "%NEW_PATH%\" >nul 2>&1
copy /Y "GUIDE_DEMARRAGE.md" "%NEW_PATH%\" >nul 2>&1
copy /Y "GUIDE_GIT.md" "%NEW_PATH%\" >nul 2>&1

echo.
echo ========================================
echo   Duplication terminee avec succes !
echo ========================================
echo.
echo Nouveau projet cree dans : %NEW_PATH%
echo.
echo Prochaines etapes :
echo.
echo 1. Allez dans le nouveau dossier :
echo    cd %NEW_FOLDER%
echo.
echo 2. Installez les dependances :
echo    npm install
echo.
echo 3. Lancez l'application :
echo    npm run dev
echo.
echo 4. (Optionnel) Initialisez un nouveau depot Git :
echo    git init
echo    git add .
echo    git commit -m "Initial commit"
echo.
pause

