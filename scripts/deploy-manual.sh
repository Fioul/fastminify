#!/bin/bash

# Script de déploiement manuel (sans Node.js sur le serveur)
# Usage: ./scripts/deploy-manual.sh [serveur] [utilisateur]

set -e

# Charger la configuration locale si elle existe
if [ -f "deploy.config.local.sh" ]; then
    source deploy.config.local.sh
    echo "📋 Configuration chargée depuis deploy.config.local.sh"
    SERVER=${1:-$DEPLOY_SERVER}
    USER=${2:-$DEPLOY_USER}
    APP_DIR=${DEPLOY_APP_DIR}
else
    echo "⚠️ Fichier deploy.config.local.sh non trouvé, utilisation des valeurs par défaut"
    SERVER=${1:-"votre-serveur.com"}
    USER=${2:-"root"}
    APP_DIR="/var/www/fastminify"
fi

echo "🔧 Déploiement manuel vers $SERVER..."

# Construire l'application
echo "🔨 Construction de l'application..."
npm run build

# Créer un package de déploiement
echo "📦 Création du package de déploiement..."
TEMP_DIR=$(mktemp -d)
PACKAGE_NAME="fastminify-$(date +%Y%m%d-%H%M%S).tar.gz"

# Copier les fichiers nécessaires
cp -r .next $TEMP_DIR/
cp -r public $TEMP_DIR/
cp -r src $TEMP_DIR/
cp package.json $TEMP_DIR/
cp package-lock.json $TEMP_DIR/
cp next.config.ts $TEMP_DIR/
cp tsconfig.json $TEMP_DIR/
cp components.json $TEMP_DIR/
cp postcss.config.mjs $TEMP_DIR/
cp tailwind.config.ts $TEMP_DIR/
cp -r node_modules $TEMP_DIR/

# Créer l'archive
cd $TEMP_DIR
tar -czf "../$PACKAGE_NAME" .
cd - > /dev/null

echo "📤 Upload de l'archive vers le serveur..."
scp "$TEMP_DIR/../$PACKAGE_NAME" $USER@$SERVER:/tmp/

echo "🚀 Déploiement sur le serveur..."
ssh $USER@$SERVER << EOF
    set -e
    
    echo "📁 Création du répertoire de l'application..."
    mkdir -p $APP_DIR
    cd $APP_DIR
    
    echo "📦 Extraction de l'archive..."
    tar -xzf "/tmp/$PACKAGE_NAME"
    
    echo "🧹 Nettoyage..."
    rm "/tmp/$PACKAGE_NAME"
    
    echo "✅ Déploiement terminé!"
    echo "🌐 Application accessible sur: http://$SERVER:3000"
    echo "📋 Pour démarrer l'application:"
    echo "   cd $APP_DIR && npm start"
EOF

# Nettoyer
rm -rf $TEMP_DIR
rm -f "$TEMP_DIR/../$PACKAGE_NAME"

echo "🎉 Déploiement manuel terminé!"
echo "📋 Prochaines étapes:"
echo "   1. Connectez-vous en SSH: ssh $USER@$SERVER"
echo "   2. Allez dans le dossier: cd $APP_DIR"
echo "   3. Démarrez l'application: npm start"
echo "   4. Configurez votre serveur web pour rediriger vers le port 3000"
