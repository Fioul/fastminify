// Copie les assets "min" de monaco-editor vers public/monaco pour self-host
const fs = require('fs')
const path = require('path')

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

try {
  const monacoMin = path.join(__dirname, '..', 'node_modules', 'monaco-editor', 'min')
  const publicMonaco = path.join(__dirname, '..', 'public', 'monaco')
  copyDir(monacoMin, publicMonaco)
  console.log('[copy-monaco] Copied monaco-editor/min -> public/monaco')
} catch (err) {
  console.error('[copy-monaco] Failed:', err)
  process.exit(0) // ne casse pas l’installation
}


