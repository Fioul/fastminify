#!/bin/bash

# Script de configuration initiale du serveur
# Usage: ./scripts/setup-server.sh [serveur] [utilisateur]

set -e

# Charger la configuration locale si elle existe
if [ -f "deploy.config.local.sh" ]; then
    source deploy.config.local.sh
    echo "📋 Configuration chargée depuis deploy.config.local.sh"
    SERVER=${1:-$DEPLOY_SERVER}
    USER=${2:-$DEPLOY_USER}
    APP_DIR=${DEPLOY_APP_DIR}
    REPO_URL=${DEPLOY_REPO_URL}
else
    echo "⚠️ Fichier deploy.config.local.sh non trouvé, utilisation des valeurs par défaut"
    SERVER=${1:-"votre-serveur.com"}
    USER=${2:-"root"}
    APP_DIR="/var/www/fastminify"
    REPO_URL="https://github.com/votre-username/fastminify.git"
fi

echo "🔧 Configuration initiale du serveur $SERVER..."

ssh $USER@$SERVER << EOF
    set -e
    
    echo "📦 Vérification de Node.js..."
    # Vérifier si Node.js est déjà installé
    if command -v node >/dev/null 2>&1; then
        echo "✅ Node.js déjà installé: $(node --version)"
        echo "✅ npm version: $(npm --version)"
    else
        echo "❌ Node.js n'est pas installé sur ce serveur"
        echo "📋 Veuillez installer Node.js 22 sur votre serveur d'hébergement"
        echo "   Contactez votre hébergeur ou consultez leur documentation"
        exit 1
    fi
    
    echo "📁 Création du répertoire de l'application..."
    mkdir -p $APP_DIR
    cd $APP_DIR
    
    echo "📥 Clonage du repository..."
    git clone $REPO_URL .
    
    echo "📦 Installation des dépendances..."
    npm ci --production
    
    echo "🔨 Construction de l'application..."
    npm run build
    
    echo "📦 Vérification de PM2..."
    # Vérifier si PM2 est disponible
    if command -v pm2 >/dev/null 2>&1; then
        echo "✅ PM2 déjà installé: $(pm2 --version)"
        echo "🚀 Démarrage de l'application avec PM2..."
        pm2 start npm --name "fastminify" -- start
        pm2 save
    else
        echo "⚠️ PM2 non disponible, démarrage simple de l'application..."
        echo "📋 Pour une gestion avancée des processus, installez PM2:"
        echo "   npm install -g pm2"
        echo "🚀 Démarrage de l'application..."
        nohup npm start > app.log 2>&1 &
        echo "✅ Application démarrée en arrière-plan (PID: $!)"
    fi
    
    echo "✅ Configuration terminée!"
    echo "🌐 Application accessible sur: http://$SERVER:3000"
    echo "📊 Pour surveiller: pm2 logs fastminify"
    echo "🔄 Pour redémarrer: pm2 restart fastminify"
EOF

echo "🎉 Configuration du serveur terminée!"
echo "📋 Prochaines étapes:"
echo "   1. Configurez votre serveur web (Nginx/Apache) pour rediriger vers le port 3000"
echo "   2. Configurez SSL/HTTPS si nécessaire"
echo "   3. Utilisez './scripts/deploy-git.sh $SERVER' pour les futurs déploiements"
