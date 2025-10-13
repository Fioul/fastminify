# 🧾 Cahier des charges — FastMinify

## 1. Objectif du projet
Créer un outil web pour minifier du code JavaScript et CSS côté client, avec une interface rapide, moderne, et SEO-friendly.

## 2. Public cible
- Développeurs front-end
- Étudiants / intégrateurs web
- Agences digitales
- Utilisateurs cherchant à optimiser des fichiers

## 3. Fonctionnalités
### Core
- Minification JS (Terser)
- Minification CSS (CSSO)
- Calcul du gain (% et octets)
- Affichage du code original / résultat
- Boutons Copy et Download

### Options
- Choix du langage (JS/CSS)
- Compatibilité (ES5/ES6+)
- Mode Safe / Aggressive
- (futur) Beautify

### UI/UX
- Shadcn/UI + TailwindCSS
- Mode sombre automatique
- Responsive
- Notifications Sonner
- Barre de progression

### SEO
- Meta / OpenGraph / Twitter
- Lighthouse > 95
- Sitemap & robots.txt

### Monétisation
- Google AdSense (2–3 emplacements)
- Objectif : 100 000 visites / mois → 400 CHF

## 4. Stack technique
| Élément | Technologie |
|----------|--------------|
| Framework | Next.js 15 |
| Langage | TypeScript |
| UI | Shadcn/UI + Tailwind |
| Notifications | Sonner |
| Minify JS | Terser |
| Minify CSS | CSSO |
| Hosting | Vercel |

## 5. Architecture
```
fastminify/
├── app/
├── components/
├── lib/
├── public/
└── README.md
```

## 6. Design
- Couleurs neutres
- Max-width 900px
- Police Inter
- CTA central : Minify

## 7. Déploiement
- Vercel (build auto via GitHub)
- HTTPS + CDN Edge

## 8. Roadmap
| Étape | Délai | État |
|--------|-------|------|
| Setup base | Jour 1 | OK |
| MVP minify | Jour 2 | OK |
| UI complète | Jour 3 | En cours |
| SEO + meta | Jour 4 | À faire |
| Déploiement | Jour 5 | À faire |
| Ads / Analytics | Jour 6 | À faire |

## 9. Évolutions futures
- HTML/JSON minify
- Beautify intégré
- API publique `/api/minify`
- Suite FastTools.dev

## 10. Objectif final
- Projet d’apprentissage Next.js
- Revenu passif publicitaire
- Référencement “minify js online”
- Base pour FastTools.dev
