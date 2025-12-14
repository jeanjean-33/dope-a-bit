@echo off
echo ========================================
echo   Initialisation Git pour dope-a-bit
echo ========================================
echo.

REM Vérifier si Git est installé
where git >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERREUR] Git n'est pas installe ou n'est pas dans le PATH.
    echo.
    echo Veuillez installer Git depuis https://git-scm.com/download/win
    echo Puis redemarrez ce script.
    echo.
    pause
    exit /b 1
)

echo [OK] Git detecte
git --version
echo.

REM Vérifier si Git est déjà initialisé
if exist ".git" (
    echo [INFO] Le depot Git est deja initialise.
    echo.
    set /p CONTINUE="Voulez-vous continuer quand meme ? (O/N): "
    if /i not "%CONTINUE%"=="O" (
        echo Operation annulee.
        pause
        exit /b 0
    )
    echo.
)

echo Initialisation du depot Git...
git init
echo.

echo Ajout de tous les fichiers...
git add .
echo.

echo Creation du premier commit...
git commit -m "Initial commit: dope-a-bit tracker d'habitudes"
echo.

echo.
echo ========================================
echo   Depot Git initialise avec succes !
echo ========================================
echo.
echo Prochaines etapes :
echo.
echo 1. Creez un depot sur GitHub : https://github.com/new
echo    - Nom : dope-a-bit (ou autre)
echo    - Visibilite : Public (pour GitHub Pages gratuit)
echo    - NE cochez PAS "Initialize with README"
echo.
echo 2. Ajoutez le remote GitHub :
echo    git remote add origin https://github.com/VOTRE-USERNAME/dope-a-bit.git
echo.
echo 3. Poussez le code :
echo    git branch -M main
echo    git push -u origin main
echo.
echo 4. Activez GitHub Pages dans les Settings du depot
echo.
echo 5. Le workflow GitHub Actions deployera automatiquement !
echo.
pause

