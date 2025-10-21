# Configuration de la page de contact

## Configuration Resend

La page de contact utilise Resend pour l'envoi d'emails. Voici comment configurer :

### 1. Créer un compte Resend

1. Allez sur [resend.com](https://resend.com)
2. Créez un compte gratuit (3 000 emails/mois)
3. Vérifiez votre domaine ou utilisez le domaine de test

### 2. Obtenir la clé API

1. Dans le dashboard Resend, allez dans "API Keys"
2. Créez une nouvelle clé API
3. Copiez la clé

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```bash
# Resend API Configuration
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Contact Email (où les messages du formulaire seront envoyés)
CONTACT_EMAIL=votre-email@example.com

# Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Pour le développement local :**
```bash
# Clé de test pour le développement (ne fonctionne pas pour l'envoi réel)
RESEND_API_KEY=re_test_key_for_development
CONTACT_EMAIL=test@example.com
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

### 4. Configuration du domaine (Production)

Pour la production, vous devez :

1. **Ajouter votre domaine dans Resend** :
   - Allez dans "Domains" dans le dashboard Resend
   - Ajoutez votre domaine (ex: fastminify.com)
   - Suivez les instructions DNS

2. **Mettre à jour l'email d'expéditeur** :
   - Dans `src/app/api/contact/route.ts`
   - Changez `from: 'FastMinify <noreply@fastminify.com>'` par votre domaine

### 5. Test

1. Démarrez le serveur : `npm run dev`
2. Allez sur `/fr/contact` ou `/en/contact`
3. Remplissez le formulaire
4. Vérifiez que l'email arrive dans votre boîte

## Fonctionnalités

- ✅ Formulaire de contact multilingue (FR/EN)
- ✅ 4 types de messages : Contact, Feedback, Idée d'amélioration, Bug
- ✅ Validation côté client et serveur
- ✅ Emails HTML stylés avec Resend
- ✅ Interface responsive avec shadcn/ui
- ✅ Gestion des erreurs et messages de succès
- ✅ Intégration dans la navigation et le footer

## Structure des fichiers

```
src/
├── app/
│   ├── [locale]/contact/
│   │   ├── page.tsx              # Page serveur
│   │   └── ContactPageClient.tsx # Composant client
│   └── api/contact/
│       └── route.ts              # API route pour l'envoi d'emails
├── components/
│   ├── Header.tsx                # Navigation avec lien contact
│   └── ClientFooter.tsx          # Footer avec lien contact
└── messages/
    ├── fr.json                   # Traductions françaises
    └── en.json                   # Traductions anglaises
```

## Personnalisation

### Modifier les types de messages

Dans `src/messages/fr.json` et `src/messages/en.json` :

```json
"messageTypes": {
  "contact": "Demande de contact",
  "feedback": "Feedback", 
  "improvement": "Idée d'amélioration",
  "bug": "Rapport de bug"
}
```

### Modifier l'email de destination

Changez la variable `CONTACT_EMAIL` dans `.env.local`

### Modifier le template d'email

Éditez le HTML dans `src/app/api/contact/route.ts` dans la section `html:`
