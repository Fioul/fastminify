#!/bin/bash

# Script de déploiement rapide
# Usage: ./scripts/quick-deploy.sh

set -e

# Charger la configuration locale si elle existe
if [ -f "deploy.config.local.sh" ]; then
    source deploy.config.local.sh
    echo "📋 Configuration chargée depuis deploy.config.local.sh"
else
    echo "⚠️ Fichier deploy.config.local.sh non trouvé"
    echo "📝 Créez d'abord votre configuration:"
    echo "   cp deploy.config.sh deploy.config.local.sh"
    echo "   # Éditez deploy.config.local.sh avec vos informations"
    exit 1
fi

# Vérifier que nous sommes sur la bonne branche
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$DEPLOY_BRANCH" ]; then
    echo "❌ Erreur: Vous devez être sur la branche '$DEPLOY_BRANCH' pour déployer"
    echo "   Branche actuelle: $CURRENT_BRANCH"
    echo "   Utilisez: git checkout $DEPLOY_BRANCH"
    exit 1
fi

# Vérifier que le working directory est clean
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Erreur: Le working directory n'est pas clean. Committez vos changements d'abord."
    echo "   Utilisez: git add . && git commit -m 'votre message'"
    exit 1
fi

echo "🚀 Déploiement rapide vers $DEPLOY_SERVER..."

# Pousser et déployer
git push origin $DEPLOY_BRANCH
./scripts/deploy-git.sh $DEPLOY_SERVER $DEPLOY_BRANCH

echo "✅ Déploiement terminé!"
echo "🌐 Votre site est accessible sur: http://$DEPLOY_SERVER"
