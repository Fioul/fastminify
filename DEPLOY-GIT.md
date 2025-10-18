# 🚀 Déploiement Git + SSH - FastMinify

## Vue d'ensemble

Ce système de déploiement automatisé utilise Git + SSH pour déployer facilement votre application FastMinify sur votre serveur.

## 🎯 Avantages

- ✅ **Déploiement en une commande** : `./scripts/quick-deploy.sh`
- ✅ **Gestion automatique** : Build, installation, redémarrage
- ✅ **Rollback facile** : Retour à une version précédente via Git
- ✅ **Monitoring intégré** : Logs, statut, redémarrage
- ✅ **Sauvegarde automatique** : Possibilité de créer des backups

## 📋 Configuration initiale

### 1. Préparer votre repository

```bash
# Créer un repository sur GitHub/GitLab
# Pousser votre code
git remote add origin https://github.com/votre-username/fastminify.git
git push -u origin develop
```

### 2. Configurer le déploiement

```bash
# Copier le fichier de configuration
cp deploy.config.sh deploy.config.local.sh

# Éditer avec vos informations
nano deploy.config.local.sh
```

**Exemple de configuration :**
```bash
export DEPLOY_SERVER="mon-serveur.com"
export DEPLOY_USER="root"
export DEPLOY_BRANCH="develop"
export DEPLOY_APP_DIR="/var/www/fastminify"
export DEPLOY_REPO_URL="https://github.com/mon-username/fastminify.git"
```

### 3. Configuration initiale du serveur

```bash
# Exécuter une seule fois pour configurer le serveur
source deploy.config.local.sh
./scripts/setup-server.sh $DEPLOY_SERVER $DEPLOY_USER
```

## 🚀 Déploiements

### Déploiement rapide (recommandé)

```bash
# Depuis votre machine locale
./scripts/quick-deploy.sh
```

### Déploiement manuel

```bash
# 1. Committer vos changements
git add .
git commit -m "Nouvelle fonctionnalité"

# 2. Déployer
source deploy.config.local.sh
./scripts/deploy-git.sh $DEPLOY_SERVER $DEPLOY_BRANCH
```

## 🛠️ Commandes de maintenance

```bash
# Voir les logs en temps réel
./scripts/server-commands.sh logs $DEPLOY_SERVER

# Redémarrer l'application
./scripts/server-commands.sh restart $DEPLOY_SERVER

# Voir le statut de l'application
./scripts/server-commands.sh status $DEPLOY_SERVER

# Mise à jour manuelle (sans push)
./scripts/server-commands.sh update $DEPLOY_SERVER

# Se connecter au serveur
./scripts/server-commands.sh shell $DEPLOY_SERVER

# Créer une sauvegarde
./scripts/server-commands.sh backup $DEPLOY_SERVER
```

## 📊 Monitoring

### Vérifier que l'application fonctionne

```bash
# Statut PM2
./scripts/server-commands.sh status $DEPLOY_SERVER

# Logs en temps réel
./scripts/server-commands.sh logs $DEPLOY_SERVER

# Test de l'application
curl http://votre-serveur.com
```

### Configuration du serveur web

**Nginx :**
```nginx
server {
    listen 80;
    server_name votre-domaine.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🔄 Workflow de développement

1. **Développement local** :
   ```bash
   npm run dev
   ```

2. **Tests** :
   ```bash
   npm test
   npm run test:regression
   ```

3. **Commit et déploiement** :
   ```bash
   git add .
   git commit -m "Description des changements"
   ./scripts/quick-deploy.sh
   ```

## 🆘 Dépannage

### Problème de connexion SSH
```bash
# Tester la connexion
ssh $DEPLOY_SERVER

# Vérifier les clés SSH
ssh-keygen -t rsa -b 4096 -C "votre-email@example.com"
ssh-copy-id $DEPLOY_USER@$DEPLOY_SERVER
```

### Problème de permissions
```bash
# Sur le serveur
sudo chown -R $USER:$USER /var/www/fastminify
```

### Problème de port
```bash
# Vérifier les ports utilisés
netstat -tulpn | grep :3000

# Tuer un processus sur le port 3000
sudo fuser -k 3000/tcp
```

### Rollback
```bash
# Retourner à une version précédente
ssh $DEPLOY_SERVER "cd /var/www/fastminify && git checkout HEAD~1 && npm run build && pm2 restart fastminify"
```

## 📝 Notes importantes

- 🔒 **Sécurité** : Le site est configuré pour ne pas être indexé par les moteurs de recherche
- 🔄 **PM2** : Gestion automatique des processus et redémarrage en cas de crash
- 📊 **Logs** : Tous les logs sont disponibles via PM2
- 💾 **Sauvegarde** : Créez des sauvegardes régulières de votre code et base de données
