#!/bin/bash

# Script de commandes de maintenance du serveur
# Usage: ./scripts/server-commands.sh [commande] [serveur]

set -e

COMMAND=${1:-"help"}
SERVER=${2:-"votre-serveur.com"}

case $COMMAND in
    "logs")
        echo "📊 Affichage des logs de l'application..."
        ssh $SERVER "pm2 logs fastminify"
        ;;
    "status")
        echo "📈 Statut de l'application..."
        ssh $SERVER "pm2 status"
        ;;
    "restart")
        echo "🔄 Redémarrage de l'application..."
        ssh $SERVER "pm2 restart fastminify"
        ;;
    "stop")
        echo "⏹️ Arrêt de l'application..."
        ssh $SERVER "pm2 stop fastminify"
        ;;
    "start")
        echo "▶️ Démarrage de l'application..."
        ssh $SERVER "pm2 start fastminify"
        ;;
    "update")
        echo "🔄 Mise à jour et redémarrage..."
        ssh $SERVER "cd /var/www/fastminify && git pull && npm ci --production && npm run build && pm2 restart fastminify"
        ;;
    "shell")
        echo "🐚 Connexion SSH au serveur..."
        ssh $SERVER
        ;;
    "backup")
        echo "💾 Sauvegarde de l'application..."
        BACKUP_FILE="fastminify-backup-$(date +%Y%m%d-%H%M%S).tar.gz"
        ssh $SERVER "cd /var && tar -czf $BACKUP_FILE www/fastminify"
        echo "✅ Sauvegarde créée: $BACKUP_FILE"
        ;;
    "help"|*)
        echo "🛠️ Commandes disponibles:"
        echo "  logs     - Afficher les logs de l'application"
        echo "  status   - Afficher le statut de l'application"
        echo "  restart  - Redémarrer l'application"
        echo "  stop     - Arrêter l'application"
        echo "  start    - Démarrer l'application"
        echo "  update   - Mettre à jour et redémarrer"
        echo "  shell    - Se connecter au serveur via SSH"
        echo "  backup   - Créer une sauvegarde"
        echo ""
        echo "Usage: ./scripts/server-commands.sh [commande] [serveur]"
        echo "Exemple: ./scripts/server-commands.sh logs mon-serveur.com"
        ;;
esac
