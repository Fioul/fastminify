# Guide de Déploiement - FastMinify

## 🚀 Déploiement en Production

### Méthode 1: Déploiement automatisé avec Git + SSH (Recommandé)

#### Prérequis
- Accès SSH à votre serveur d'hébergement
- Repository Git (GitHub, GitLab, etc.)
- Votre domaine configuré

#### Configuration initiale

1. **Personnalisez la configuration** :
```bash
# Copiez et modifiez le fichier de configuration
cp deploy.config.sh deploy.config.local.sh
# Éditez deploy.config.local.sh avec vos informations
```

2. **Configuration initiale du serveur** :
```bash
# Exécutez le script de configuration (une seule fois)
source deploy.config.local.sh
./scripts/setup-server.sh $DEPLOY_SERVER $DEPLOY_USER
```

#### Déploiements futurs

```bash
# Déploiement simple (depuis votre machine locale)
source deploy.config.local.sh
./scripts/deploy-git.sh $DEPLOY_SERVER $DEPLOY_BRANCH
```

#### Commandes de maintenance

```bash
# Voir les logs
./scripts/server-commands.sh logs $DEPLOY_SERVER

# Redémarrer l'application
./scripts/server-commands.sh restart $DEPLOY_SERVER

# Voir le statut
./scripts/server-commands.sh status $DEPLOY_SERVER

# Mise à jour manuelle
./scripts/server-commands.sh update $DEPLOY_SERVER
```

### Méthode 2: Déploiement manuel (Alternative)

#### Prérequis
- Node.js 18+ installé sur votre serveur
- Accès SSH à votre serveur d'hébergement
- Votre domaine configuré

#### Étapes de déploiement

1. **Préparation locale** :
```bash
# Construire l'application
npm run build

# Vérifier que la construction fonctionne
npm start
```

2. **Upload sur le serveur** :
Uploadez ces dossiers/fichiers sur votre serveur :
- `.next/` (dossier de build)
- `public/` (fichiers statiques)
- `package.json`
- `package-lock.json`

3. **Configuration du serveur** :
```bash
# Sur votre serveur
cd /path/to/your/app

# Installer les dépendances de production
npm ci --production

# Démarrer l'application
npm start
```

#### 4. Configuration du serveur web (Nginx/Apache)

**Nginx:**
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

**Apache (.htaccess):**
```apache
RewriteEngine On
RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
```

#### 5. SSL/HTTPS (recommandé)
Utilisez Let's Encrypt pour obtenir un certificat SSL gratuit :
```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat
sudo certbot --nginx -d votre-domaine.com
```

### 🔒 Protection contre l'indexation

Le site est déjà configuré pour ne pas être indexé :
- ✅ `robots.txt` bloque tous les robots
- ✅ Meta tags `noindex, nofollow` 
- ✅ Configuration Google Bot

### 📊 Monitoring

Pour surveiller l'application :
```bash
# Vérifier les logs
pm2 logs fastminify

# Redémarrer l'application
pm2 restart fastminify

# Status
pm2 status
```

### 🔄 Mises à jour

Pour mettre à jour l'application :
1. Faire les changements localement
2. `npm run build`
3. Uploader les nouveaux fichiers
4. Redémarrer l'application

### 🆘 Dépannage

**Problème de port :**
- Vérifiez que le port 3000 est libre
- Changez le port dans `package.json` si nécessaire

**Problème de permissions :**
```bash
sudo chown -R $USER:$USER /path/to/your/app
```

**Problème de mémoire :**
- Augmentez la limite de mémoire Node.js
- Utilisez PM2 pour la gestion des processus
