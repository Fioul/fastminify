# 🧪 Tests Unitaires - FastMinify

Ce dossier contient tous les tests unitaires pour les fonctions de minification de FastMinify.

## 📁 Structure

```
__tests__/
├── README.md                    # Ce fichier
├── javascript-options.test.ts   # Tests minification JavaScript
├── minify-css.test.ts          # Tests minification CSS
├── minify-json.test.ts         # Tests minification JSON
└── php-serializer.test.ts      # Tests sérialisation PHP
```

## 🎯 Objectifs

### Validation des fonctionnalités
- ✅ Minification JavaScript avec Terser
- ✅ Minification CSS avec CSSNano
- ✅ Minification JSON
- ✅ Sérialisation/désérialisation PHP

### Gestion des erreurs
- ✅ Code invalide rejeté proprement
- ✅ Messages d'erreur clairs
- ✅ Pas de crash de l'application

### Performance
- ✅ Traitement rapide des gros fichiers
- ✅ Gestion efficace de la mémoire
- ✅ Timeouts appropriés

## 🚀 Commandes rapides

```bash
# Lancer tous les tests
npm test

# Tests en mode watch (développement)
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Test d'un fichier spécifique
npm test -- javascript-options.test.ts
```

## 📊 Résultats actuels

**Dernière exécution :** 59/68 tests passent (87% de réussite)

### ✅ Tests qui passent
- Minification JavaScript basique
- Gestion des options ECMAScript
- Minification CSS standard
- Sérialisation PHP simple
- Gestion des erreurs

### ❌ Tests à corriger
- Caractères spéciaux en JSON
- Désérialisation PHP complexe
- Compression JavaScript trop agressive
- Optimisations CSS inattendues

## 🔧 Ajout de nouveaux tests

### Template de base
```typescript
import { functionToTest } from '../module-to-test'

describe('Module Name', () => {
  test('should do something specific', async () => {
    const input = 'test input'
    const result = await functionToTest(input)
    
    expect(result).toBeDefined()
    expect(result).toContain('expected')
  })
})
```

### Patterns recommandés
- **Nommage** : `should [action] when [condition]`
- **Structure** : Arrange, Act, Assert
- **Assertions** : Spécifiques et claires
- **Données** : Réalistes et variées

## 🐛 Débogage

### Tests qui échouent
1. Lire le message d'erreur
2. Vérifier les données de test
3. Tester manuellement la fonction
4. Ajuster le test ou corriger le code

### Tests instables
1. Vérifier les timeouts
2. Utiliser des marges de sécurité
3. Éviter les dépendances externes
4. Tester avec des données fixes

## 📈 Métriques

### Couverture de code
- **Branches** : 80% minimum
- **Functions** : 80% minimum
- **Lines** : 80% minimum
- **Statements** : 80% minimum

### Performance
- **JavaScript** : < 5 secondes pour 100 fonctions
- **CSS** : < 3 secondes pour 1000 règles
- **JSON** : < 1 seconde pour 1000 objets
- **PHP** : < 2 secondes pour 1000 éléments

## 🎯 Prochaines étapes

1. **Corriger les tests qui échouent**
2. **Ajouter des tests d'intégration**
3. **Implémenter des tests E2E**
4. **Améliorer la couverture de code**

---

**💡 Astuce** : Utilisez `npm run test:watch` pendant le développement pour un feedback immédiat !
