#!/bin/bash

# Script de déploiement pour FastMinify
echo "🚀 Déploiement de FastMinify..."

# Vérifier que nous sommes sur la branche develop
if [ "$(git branch --show-current)" != "develop" ]; then
    echo "❌ Erreur: Vous devez être sur la branche 'develop' pour déployer"
    exit 1
fi

# Vérifier que le working directory est clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Le working directory n'est pas clean. Committez vos changements d'abord."
    exit 1
fi

echo "📦 Construction de l'application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction"
    exit 1
fi

echo "✅ Construction réussie!"
echo ""
echo "📋 Instructions pour le déploiement:"
echo "1. Uploadez le dossier '.next' et 'public' sur votre serveur"
echo "2. Installez Node.js (version 18+) sur votre serveur"
echo "3. Installez les dépendances: npm ci --production"
echo "4. Démarrez l'application: npm start"
echo ""
echo "🌐 Votre site sera accessible sur votre domaine!"
echo "🔒 Le site est configuré pour ne pas être indexé par les moteurs de recherche"
