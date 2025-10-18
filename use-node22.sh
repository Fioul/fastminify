#!/bin/bash

# Script simple pour utiliser Node.js 22 avec NVM
# Usage: source ./use-node22.sh

echo "🔄 Activation de Node.js 22 pour FastMinify..."

# Vérifier si NVM est disponible
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
    
    # Vérifier si Node.js 22 est installé
    if nvm list | grep -q "v22"; then
        nvm use 22
        echo "✅ Node.js 22 activé"
        echo "📊 Version: $(node --version)"
        echo "📦 npm: $(npm --version)"
    else
        echo "📦 Installation de Node.js 22..."
        nvm install 22
        nvm use 22
        echo "✅ Node.js 22 installé et activé"
        echo "📊 Version: $(node --version)"
        echo "📦 npm: $(npm --version)"
    fi
else
    echo "❌ NVM n'est pas installé ou non trouvé"
    echo "📋 Installez NVM d'abord:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    echo "   source ~/.bashrc  # ou ~/.zshrc"
fi
