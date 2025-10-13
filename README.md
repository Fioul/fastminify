# ⚡️ FastMinify

> Free online tool to minify JavaScript and CSS instantly — fast, modern, and privacy-friendly.

![FastMinify Screenshot](public/preview.png)

## 🧠 Overview
FastMinify is a minimalist web app built with Next.js, designed to provide instant JS and CSS minification directly in the browser. It focuses on speed, UX clarity, and modern web performance, without collecting any user data.

## 🚀 Features
- 🧩 Instant minification for JavaScript and CSS (client-side, no upload)
- ⚙️ Options: Safe / Aggressive compression, ES5 / ES6 compatibility
- 🎨 Modern UI with Shadcn/UI
- 🌙 Dark mode automatically supported
- 📊 Statistics showing size saved and compression rate
- 📋 Copy & Download results easily
- 🔔 Toast notifications via Sonner
- 💻 100% static — no backend, fully privacy-safe

## 🧰 Tech Stack
| Layer | Technology |
|-------|-------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| UI Library | Shadcn/UI |
| Notifications | Sonner |
| JS Minification | Terser |
| CSS Minification | CSSO |
| Hosting | Vercel |

## ⚙️ Installation & Development
```bash
git clone https://github.com/<yourusername>/fastminify.git
cd fastminify
npm install
npm run dev
```
App available at → http://localhost:3000

### Build for production
```bash
npm run build
npm start
```

## 🧱 Project structure
```
fastminify/
├── app/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── CodeEditor.tsx
│   ├── OptionsPanel.tsx
│   └── ResultPanel.tsx
├── lib/
│   ├── minify-js.ts
│   ├── minify-css.ts
│   └── utils.ts
├── public/
│   └── favicon.ico
└── README.md
```

## 🧩 Environment & Build
| Command | Description |
|----------|-------------|
| `npm run dev` | Start local dev server |
| `npm run build` | Build production bundle |
| `npm start` | Launch production server |
| `vercel` | Deploy to Vercel instantly |

## 📈 SEO & Performance
- Metadata via `layout.tsx`
- OpenGraph & Twitter tags
- Lighthouse score >95
- Hosted on Vercel Edge

## 🛡️ Privacy
- 100% client-side minification
- No tracking or code upload
- Clipboard API only used locally

## 🧑‍💻 Author
**FastMinify** — Built by techniConcept
> “Code faster. Load faster.”

## 📜 License
MIT © 2025
