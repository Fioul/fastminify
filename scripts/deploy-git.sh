#!/bin/bash

# Script de déploiement automatisé avec Git + SSH
# Usage: ./scripts/deploy-git.sh [serveur] [branche]

set -e  # Arrêter en cas d'erreur

# Configuration
SERVER=${1:-"votre-serveur.com"}
BRANCH=${2:-"develop"}
APP_DIR="/var/www/fastminify"
REPO_URL="https://github.com/votre-username/fastminify.git"  # Remplacez par votre repo

echo "🚀 Déploiement de FastMinify sur $SERVER..."

# Vérifier que nous sommes sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    echo "❌ Erreur: Vous devez être sur la branche '$BRANCH' pour déployer"
    echo "   Branche actuelle: $CURRENT_BRANCH"
    exit 1
fi

# Vérifier que le working directory est clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Le working directory n'est pas clean. Committez vos changements d'abord."
    exit 1
fi

# Pousser les changements vers le repository distant
echo "📤 Poussage des changements vers le repository..."
git push origin $BRANCH

# Déployer sur le serveur via SSH
echo "🔄 Déploiement sur le serveur $SERVER..."

ssh $SERVER << EOF
    set -e
    
    echo "📁 Navigation vers le répertoire de l'application..."
    cd $APP_DIR
    
    echo "📥 Récupération des derniers changements..."
    git fetch origin
    git reset --hard origin/$BRANCH
    
    echo "📦 Installation des dépendances..."
    npm ci --production
    
    echo "🔨 Construction de l'application..."
    npm run build
    
    echo "🔄 Redémarrage de l'application..."
    if command -v pm2 >/dev/null 2>&1; then
        pm2 restart fastminify || pm2 start npm --name "fastminify" -- start
    else
        # Tuer les processus existants sur le port 3000
        pkill -f "next start" || true
        # Démarrer l'application en arrière-plan
        nohup npm start > app.log 2>&1 &
    fi
    
    echo "✅ Déploiement terminé!"
    echo "🌐 Application accessible sur: http://$SERVER"
EOF

echo "🎉 Déploiement réussi!"
echo "📊 Pour surveiller l'application: ssh $SERVER 'pm2 logs fastminify'"
