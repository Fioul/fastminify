#!/bin/bash

# Configuration de déploiement - Personnalisez ces valeurs
# Copiez ce fichier et modifiez les valeurs selon votre configuration

# Informations du serveur
export DEPLOY_SERVER="ff38dk.ftp.infomaniak.com"
export DEPLOY_USER="ff38dk_fastminify"  # ou votre utilisateur SSH
export DEPLOY_BRANCH="develop"
export DEPLOY_APP_DIR="/home/clients/a261810f09be2e3e6b95f21bf190d1e1/sites/fastminify.com"
export DEPLOY_REPO_URL="https://github.com/Fioul/fastminify.git"

# Port de l'application
export DEPLOY_PORT="3000"

# Configuration PM2
export PM2_APP_NAME="fastminify"

# Exemples d'utilisation:
# source deploy.config.sh
# ./scripts/setup-server.sh $DEPLOY_SERVER $DEPLOY_USER
# ./scripts/deploy-git.sh $DEPLOY_SERVER $DEPLOY_BRANCH
