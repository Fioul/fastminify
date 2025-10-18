#!/bin/bash

# Script de configuration SSL pour FastMinify
# Usage: ./scripts/setup-ssl.sh

set -e

echo "🔒 Configuration SSL pour FastMinify..."

# Vérifier si Certbot est installé
if ! command -v certbot >/dev/null 2>&1; then
    echo "📦 Installation de Certbot..."
    sudo apt update
    sudo apt install -y certbot python3-certbot-nginx
fi

# Vérifier si Nginx est installé
if ! command -v nginx >/dev/null 2>&1; then
    echo "❌ Nginx n'est pas installé. Veuillez installer Nginx d'abord."
    exit 1
fi

echo "🔐 Génération des certificats SSL..."

# Générer le certificat pour le domaine principal
echo "📋 Configuration du certificat pour fastminify.com..."
sudo certbot --nginx -d fastminify.com -d www.fastminify.com --non-interactive --agree-tos --email admin@fastminify.com

# Générer le certificat pour le domaine secondaire (pour la redirection)
echo "📋 Configuration du certificat pour fast-minify.com..."
sudo certbot --nginx -d fast-minify.com -d www.fast-minify.com --non-interactive --agree-tos --email admin@fastminify.com

echo "📝 Configuration de la configuration Nginx..."
# Copier la configuration Nginx
sudo cp nginx-config.conf /etc/nginx/sites-available/fastminify

# Activer le site
sudo ln -sf /etc/nginx/sites-available/fastminify /etc/nginx/sites-enabled/

# Tester la configuration
echo "🧪 Test de la configuration Nginx..."
sudo nginx -t

# Recharger Nginx
echo "🔄 Rechargement de Nginx..."
sudo systemctl reload nginx

echo "✅ Configuration SSL terminée!"
echo ""
echo "🌐 Vos domaines sont maintenant configurés :"
echo "   - https://fastminify.com (domaine principal)"
echo "   - https://fast-minify.com (redirige vers fastminify.com)"
echo "   - https://www.fastminify.com (redirige vers fastminify.com)"
echo "   - https://www.fast-minify.com (redirige vers fastminify.com)"
echo ""
echo "🔄 Les redirections sont configurées au niveau :"
echo "   1. Nginx (redirection HTTP 301)"
echo "   2. Next.js middleware (redirection application)"
echo ""
echo "📊 Pour vérifier le statut :"
echo "   sudo systemctl status nginx"
echo "   sudo certbot certificates"
