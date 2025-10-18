# 🔄 Configuration NVM pour FastMinify

Ce guide vous explique comment configurer NVM pour utiliser automatiquement Node.js 22 avec FastMinify.

## 📋 Prérequis

- NVM installé sur votre système
- Terminal Bash ou Zsh

## 🚀 Options de configuration

### Option 1 : Auto-switch automatique (recommandé)

Cette option active automatiquement Node.js 22 chaque fois que vous entrez dans le dossier FastMinify.

```bash
# Exécuter le script de configuration
./setup-nvm-auto.sh

# Recharger votre shell
source ~/.bashrc  # ou ~/.zshrc
```

**Avantages :**
- ✅ Automatique
- ✅ Transparent
- ✅ Fonctionne à chaque `cd` dans le dossier

### Option 2 : Activation manuelle

Si vous préférez contrôler manuellement l'activation :

```bash
# Activer Node.js 22 pour cette session
source ./use-node22.sh
```

**Avantages :**
- ✅ Contrôle total
- ✅ Pas de modification du shell
- ✅ Flexible

### Option 3 : Script d'auto-switch

Pour une solution intermédiaire :

```bash
# Exécuter le script d'auto-switch
./.nvmrc-auto
```

## 🔧 Désinstallation

Pour désinstaller l'auto-switch automatique :

```bash
# Supprimer les lignes ajoutées à votre .bashrc/.zshrc
nano ~/.bashrc  # ou ~/.zshrc
# Supprimer les lignes contenant "Auto-switch NVM pour FastMinify"
```

## 📊 Vérification

Vérifiez que tout fonctionne :

```bash
# Vérifier la version Node.js
node --version  # Devrait afficher v22.x.x

# Vérifier npm
npm --version

# Tester le build
npm run build
```

## 🆘 Dépannage

### NVM non trouvé
```bash
# Installer NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc  # ou ~/.zshrc
```

### Node.js 22 non installé
```bash
# Installer Node.js 22
nvm install 22
nvm use 22
```

### Problèmes de permissions
```bash
# Rendre les scripts exécutables
chmod +x setup-nvm-auto.sh
chmod +x use-node22.sh
chmod +x .nvmrc-auto
```

## 📝 Notes

- Le fichier `.nvmrc` contient la version Node.js recommandée (22)
- Les scripts détectent automatiquement votre shell (Bash/Zsh)
- L'auto-switch ne fonctionne que dans le dossier FastMinify
