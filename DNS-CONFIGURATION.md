# 🌐 Configuration DNS pour FastMinify

Ce guide vous explique comment configurer vos domaines `fastminify.com` et `fast-minify.com` pour la redirection.

## 📋 Configuration DNS requise

### **1. Domaines à configurer :**
- `fastminify.com` (domaine principal)
- `www.fastminify.com` (sous-domaine www)
- `fast-minify.com` (domaine secondaire - redirige)
- `www.fast-minify.com` (sous-domaine www - redirige)

### **2. Enregistrements DNS à créer :**

#### **Pour fastminify.com :**
```
Type: A
Nom: @
Valeur: [IP_DE_VOTRE_SERVEUR]
TTL: 3600

Type: A
Nom: www
Valeur: [IP_DE_VOTRE_SERVEUR]
TTL: 3600
```

#### **Pour fast-minify.com :**
```
Type: A
Nom: @
Valeur: [IP_DE_VOTRE_SERVEUR]
TTL: 3600

Type: A
Nom: www
Valeur: [IP_DE_VOTRE_SERVEUR]
TTL: 3600
```

### **3. Configuration CNAME (alternative) :**
Si vous préférez utiliser CNAME pour les sous-domaines :

```
Type: CNAME
Nom: www.fastminify.com
Valeur: fastminify.com
TTL: 3600

Type: CNAME
Nom: www.fast-minify.com
Valeur: fast-minify.com
TTL: 3600
```

## 🔄 Redirections configurées

### **Niveau serveur (Nginx) :**
- `fast-minify.com` → `https://fastminify.com` (301)
- `www.fast-minify.com` → `https://fastminify.com` (301)
- `www.fastminify.com` → `https://fastminify.com` (301)

### **Niveau application (Next.js) :**
- Redirection de domaine dans le middleware
- Redirection www vers non-www
- Redirection vers HTTPS

## 🚀 Étapes de déploiement

### **1. Configuration DNS :**
1. Connectez-vous à votre panneau de contrôle DNS
2. Créez les enregistrements A pour les deux domaines
3. Attendez la propagation DNS (5-60 minutes)

### **2. Configuration serveur :**
```bash
# Cloner le repository
git clone https://github.com/votre-username/fastminify.git
cd fastminify

# Installer et configurer
npm install
npm run build

# Configurer SSL et Nginx
./scripts/setup-ssl.sh
```

### **3. Vérification :**
```bash
# Tester les redirections
curl -I http://fast-minify.com
curl -I https://fast-minify.com
curl -I http://www.fastminify.com
curl -I https://www.fastminify.com
```

## 🔍 Tests de redirection

### **Tests manuels :**
- Visitez `http://fast-minify.com` → doit rediriger vers `https://fastminify.com`
- Visitez `https://fast-minify.com` → doit rediriger vers `https://fastminify.com`
- Visitez `http://www.fastminify.com` → doit rediriger vers `https://fastminify.com`
- Visitez `https://www.fastminify.com` → doit rediriger vers `https://fastminify.com`

### **Tests avec curl :**
```bash
# Tester la redirection
curl -I https://fast-minify.com
# Doit retourner : HTTP/1.1 301 Moved Permanently
# Location: https://fastminify.com

curl -I https://www.fastminify.com
# Doit retourner : HTTP/1.1 301 Moved Permanently
# Location: https://fastminify.com
```

## 🛠️ Dépannage

### **Problème : Redirection ne fonctionne pas**
1. Vérifiez la configuration DNS
2. Vérifiez que Nginx est configuré correctement
3. Vérifiez les logs Nginx : `sudo tail -f /var/log/nginx/error.log`

### **Problème : Certificat SSL**
1. Vérifiez que les domaines pointent vers votre serveur
2. Relancez Certbot : `sudo certbot --nginx -d fastminify.com -d fast-minify.com`

### **Problème : Application ne démarre pas**
1. Vérifiez les logs PM2 : `pm2 logs fastminify`
2. Vérifiez que le port 3000 est ouvert
3. Testez localement : `curl http://localhost:3000`

## 📊 Monitoring

### **Vérifier le statut :**
```bash
# Statut Nginx
sudo systemctl status nginx

# Statut de l'application
pm2 status

# Logs en temps réel
pm2 logs fastminify
sudo tail -f /var/log/nginx/access.log
```

### **Renouvellement SSL automatique :**
```bash
# Tester le renouvellement
sudo certbot renew --dry-run

# Le renouvellement est automatique via cron
```
