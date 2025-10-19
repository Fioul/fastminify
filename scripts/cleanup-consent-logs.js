#!/usr/bin/env node

/**
 * Script de nettoyage des logs de consentement
 * Usage: node scripts/cleanup-consent-logs.js
 */

const fs = require('fs').promises
const path = require('path')

const LOGS_DIR = path.join(process.cwd(), 'logs')
const CONSENT_LOG_FILE = path.join(LOGS_DIR, 'consent-logs.json')

async function cleanupConsentLogs() {
  try {
    console.log('🧹 Nettoyage des logs de consentement...')
    
    // Vérifier si le fichier existe
    try {
      await fs.access(CONSENT_LOG_FILE)
    } catch (error) {
      console.log('📁 Aucun fichier de logs trouvé.')
      return
    }

    // Lire les logs existants
    const data = await fs.readFile(CONSENT_LOG_FILE, 'utf-8')
    const logs = JSON.parse(data)
    
    console.log(`📊 ${logs.length} logs trouvés`)
    
    const now = new Date()
    const threeYearsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate())
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    
    // Séparer les logs par âge
    const logsToKeep = []
    const logsToArchive = []
    const logsToDelete = []
    
    logs.forEach(log => {
      const logDate = new Date(log.timestamp)
      
      if (logDate > oneYearAgo) {
        // Moins d'1 an : garder tel quel
        logsToKeep.push(log)
      } else if (logDate > threeYearsAgo) {
        // Entre 1 et 3 ans : archiver (supprimer IP)
        const archivedLog = {
          ...log,
          ip: '[ARCHIVED]',
          userAgent: '[ARCHIVED]'
        }
        logsToArchive.push(archivedLog)
      } else {
        // Plus de 3 ans : supprimer
        logsToDelete.push(log)
      }
    })
    
    console.log(`✅ ${logsToKeep.length} logs récents conservés`)
    console.log(`📦 ${logsToArchive.length} logs archivés (IP supprimée)`)
    console.log(`🗑️  ${logsToDelete.length} logs anciens supprimés`)
    
    // Sauvegarder les logs nettoyés
    const cleanedLogs = [...logsToKeep, ...logsToArchive]
    await fs.writeFile(CONSENT_LOG_FILE, JSON.stringify(cleanedLogs, null, 2))
    
    // Créer un fichier d'archive si nécessaire
    if (logsToArchive.length > 0) {
      const archiveFile = path.join(LOGS_DIR, `consent-logs-archive-${now.toISOString().split('T')[0]}.json`)
      await fs.writeFile(archiveFile, JSON.stringify(logsToArchive, null, 2))
      console.log(`📁 Archive créée: ${archiveFile}`)
    }
    
    console.log('✨ Nettoyage terminé avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error)
    process.exit(1)
  }
}

// Exécuter le script
if (require.main === module) {
  cleanupConsentLogs()
}

module.exports = { cleanupConsentLogs }
