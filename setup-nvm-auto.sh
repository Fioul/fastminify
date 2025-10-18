#!/bin/bash

# Script de configuration pour l'auto-switch NVM
# Usage: ./setup-nvm-auto.sh

echo "🔧 Configuration de l'auto-switch NVM pour FastMinify..."

# Détecter le shell de l'utilisateur
SHELL_RC=""
if [ -n "$ZSH_VERSION" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -n "$BASH_VERSION" ]; then
    SHELL_RC="$HOME/.bashrc"
else
    echo "❌ Shell non supporté. Veuillez ajouter manuellement le code suivant à votre .bashrc ou .zshrc:"
    echo ""
    echo "# Auto-switch NVM pour FastMinify"
    echo "if [ -f \"\$HOME/.nvm/nvm.sh\" ] && [ -f \".nvmrc\" ]; then"
    echo "    source \$HOME/.nvm/nvm.sh"
    echo "    nvm use"
    echo "fi"
    exit 1
fi

# Vérifier si NVM est installé
if [ ! -s "$HOME/.nvm/nvm.sh" ]; then
    echo "❌ NVM n'est pas installé. Veuillez installer NVM d'abord:"
    echo "   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
    exit 1
fi

# Créer le code à ajouter
NVM_CODE="
# Auto-switch NVM pour FastMinify
if [ -f \"\$HOME/.nvm/nvm.sh\" ] && [ -f \".nvmrc\" ]; then
    source \$HOME/.nvm/nvm.sh
    nvm use
fi"

# Vérifier si le code existe déjà
if grep -q "Auto-switch NVM pour FastMinify" "$SHELL_RC" 2>/dev/null; then
    echo "✅ L'auto-switch NVM est déjà configuré dans $SHELL_RC"
else
    echo "📝 Ajout de l'auto-switch NVM à $SHELL_RC..."
    echo "$NVM_CODE" >> "$SHELL_RC"
    echo "✅ Configuration terminée!"
    echo ""
    echo "🔄 Pour activer les changements, exécutez:"
    echo "   source $SHELL_RC"
    echo ""
    echo "🎉 Maintenant, à chaque fois que vous entrerez dans le dossier FastMinify,"
    echo "   Node.js 22 sera automatiquement activé!"
fi
