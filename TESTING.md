# 🧪 Guide de Tests - FastMinify

Ce document explique comment utiliser et maintenir les tests automatisés pour FastMinify.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Installation et configuration](#installation-et-configuration)
- [Commandes de test](#commandes-de-test)
- [Structure des tests](#structure-des-tests)
- [Types de tests](#types-de-tests)
- [Écriture de nouveaux tests](#écriture-de-nouveaux-tests)
- [Résolution de problèmes](#résolution-de-problèmes)
- [Bonnes pratiques](#bonnes-pratiques)

## 🎯 Vue d'ensemble

FastMinify utilise **Jest** comme framework de tests principal pour garantir la fiabilité et la précision des fonctionnalités de minification.

### Objectifs des tests :
- ✅ **Validation** : Vérifier que les conversions fonctionnent correctement
- ✅ **Régression** : Détecter les bugs lors des modifications
- ✅ **Qualité** : Maintenir un code fiable et précis
- ✅ **Confiance** : Déployer en toute sécurité

### Couverture actuelle :
- **JavaScript** : Minification avec Terser (options avancées)
- **CSS** : Minification avec CSSNano
- **JSON** : Minification et validation
- **PHP** : Sérialisation/désérialisation

## 🚀 Installation et configuration

### Prérequis
```bash
# Les dépendances sont déjà installées dans package.json
npm install
```

### Configuration Jest
Le fichier `jest.config.js` configure :
- **Environnement** : jsdom (pour les tests React)
- **Aliases** : `@/` pointe vers `src/`
- **Couverture** : Seuil de 80% minimum
- **Patterns** : Exclusion des dossiers `.next/` et `node_modules/`

## 🎮 Commandes de test

### Tests de base
```bash
# Lancer tous les tests
npm test

# Lancer les tests en mode watch (recommandé pour le développement)
npm run test:watch

# Lancer les tests avec rapport de couverture
npm run test:coverage

# Lancer les tests pour CI/CD (sans watch)
npm run test:ci
```

### Tests spécifiques
```bash
# Tester un fichier spécifique
npm test -- javascript-options.test.ts

# Tester un pattern
npm test -- --testNamePattern="minification"

# Tester avec verbose
npm test -- --verbose
```

## 📁 Structure des tests

```
src/lib/__tests__/
├── javascript-options.test.ts    # Tests minification JS
├── minify-css.test.ts           # Tests minification CSS
├── minify-json.test.ts          # Tests minification JSON
└── php-serializer.test.ts       # Tests sérialisation PHP
```

### Convention de nommage
- **Fichiers** : `[nom-fonction].test.ts`
- **Dossiers** : `__tests__/` dans chaque module
- **Descriptions** : `describe('Module Name', () => {})`
- **Tests** : `test('should do something specific', () => {})`

## 🔬 Types de tests

### 1. Tests unitaires
Testent les fonctions individuelles de minification.

```typescript
test('should minify simple JavaScript correctly', async () => {
  const input = 'function hello() { console.log("world"); }'
  const result = await minifyJavaScript(input, defaultOptions)
  
  expect(result).toBeDefined()
  expect(result.length).toBeLessThan(input.length)
})
```

### 2. Tests de validation
Vérifient la gestion des erreurs.

```typescript
test('should handle invalid JavaScript syntax', async () => {
  const input = 'function invalid syntax {'
  
  await expect(minifyJavaScript(input, defaultOptions))
    .rejects.toThrow()
})
```

### 3. Tests de performance
Vérifient que les opérations sont efficaces.

```typescript
test('should handle large code efficiently', async () => {
  const input = Array(100).fill(0).map((_, i) => 
    `function test${i}() { return ${i}; }`
  ).join('\n')
  
  const start = Date.now()
  const result = await minifyJavaScript(input, defaultOptions)
  const duration = Date.now() - start
  
  expect(duration).toBeLessThan(5000) // Moins de 5 secondes
})
```

## ✍️ Écriture de nouveaux tests

### Template de base
```typescript
import { functionToTest } from '../module-to-test'

describe('Module Name', () => {
  describe('Feature Group', () => {
    test('should do something specific', async () => {
      // Arrange
      const input = 'test input'
      const expected = 'expected output'
      
      // Act
      const result = await functionToTest(input)
      
      // Assert
      expect(result).toBe(expected)
    })
  })
})
```

### Patterns de test courants

#### Test de minification basique
```typescript
test('should minify code correctly', async () => {
  const input = 'code with spaces and comments'
  const result = await minifyFunction(input)
  
  expect(result).toBeDefined()
  expect(result.length).toBeLessThan(input.length)
})
```

#### Test de gestion d'erreur
```typescript
test('should throw error for invalid input', async () => {
  const input = 'invalid syntax'
  
  await expect(minifyFunction(input))
    .rejects.toThrow('Expected error message')
})
```

#### Test d'options
```typescript
test('should respect specific option', async () => {
  const input = 'code to test'
  const options = { specificOption: true }
  
  const result = await minifyFunction(input, options)
  
  expect(result).toContain('expected behavior')
})
```

## 🐛 Résolution de problèmes

### Tests qui échouent

#### 1. Analyser l'erreur
```bash
npm test -- --verbose
```

#### 2. Vérifier la couverture
```bash
npm run test:coverage
```

#### 3. Tester en mode watch
```bash
npm run test:watch
```

### Problèmes courants

#### Tests de minification trop stricts
```typescript
// ❌ Trop strict
expect(result).toBe('exact output')

// ✅ Plus flexible
expect(result).toContain('key element')
expect(result.length).toBeLessThan(input.length)
```

#### Tests de performance instables
```typescript
// ❌ Temps fixe
expect(duration).toBeLessThan(1000)

// ✅ Marge de sécurité
expect(duration).toBeLessThan(5000)
```

#### Tests d'options complexes
```typescript
// ❌ Test trop complexe
expect(result).toHaveProperty('specific.nested.property')

// ✅ Test par étapes
expect(result).toBeDefined()
expect(result).toContain('expected element')
```

## 📊 Métriques de qualité

### Seuils de couverture
- **Branches** : 80%
- **Functions** : 80%
- **Lines** : 80%
- **Statements** : 80%

### Commandes de vérification
```bash
# Voir la couverture détaillée
npm run test:coverage

# Vérifier les seuils
npm run test:ci
```

## 🎯 Bonnes pratiques

### 1. Nommage des tests
```typescript
// ✅ Bon
test('should minify JavaScript with ES2020 features', () => {})

// ❌ Mauvais
test('test1', () => {})
```

### 2. Structure des tests
```typescript
describe('Module Name', () => {
  describe('Feature Group', () => {
    test('should handle normal case', () => {})
    test('should handle edge case', () => {})
    test('should handle error case', () => {})
  })
})
```

### 3. Assertions claires
```typescript
// ✅ Bon
expect(result).toBeDefined()
expect(result.length).toBeLessThan(input.length)
expect(result).toContain('expected content')

// ❌ Mauvais
expect(result).toBeTruthy()
```

### 4. Données de test
```typescript
// ✅ Bon - Données réalistes
const input = 'function test() { return "hello"; }'

// ❌ Mauvais - Données artificielles
const input = 'abc'
```

## 🔄 Intégration continue

### GitHub Actions (exemple)
```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test:ci
```

### Pré-commit hooks
```bash
# Installer husky (optionnel)
npm install --save-dev husky

# Ajouter le hook
npx husky add .husky/pre-commit "npm run test:ci"
```

## 📈 Évolution des tests

### Ajout de nouvelles fonctionnalités
1. **Écrire les tests d'abord** (TDD)
2. **Implémenter la fonctionnalité**
3. **Vérifier que tous les tests passent**
4. **Mettre à jour la documentation**

### Refactoring
1. **Lancer les tests avant modification**
2. **Effectuer le refactoring**
3. **Vérifier que tous les tests passent encore**
4. **Ajuster les tests si nécessaire**

## 🎉 Résultat

Avec cette suite de tests, FastMinify garantit :
- ✅ **Fiabilité** : Les conversions fonctionnent correctement
- ✅ **Précision** : Les résultats sont exacts
- ✅ **Stabilité** : Pas de régression lors des modifications
- ✅ **Confiance** : Déploiements sécurisés

---

**💡 Conseil** : Lancez `npm run test:watch` pendant le développement pour avoir un feedback immédiat sur vos modifications !
