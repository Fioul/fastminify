const fs = require('fs-extra')
const path = require('path')

const sourcePath = path.join(__dirname, '../node_modules/monaco-editor/min/vs')
const destinationPath = path.join(__dirname, '../public/monaco/vs')

// Fichiers essentiels pour ESM js/css/json uniquement (structure Monaco 0.54+)
const essentialFiles = [
  // Core Monaco API
  'editor.api-i0YVFWkl.js',
  
  // Language modes
  'jsonMode-CJjR_ECa.js',
  'cssMode-CGp6dFmI.js', 
  'typescript-4zug7YwV.js',
  
  // Workers
  'assets/css.worker-cO8rX8Iy.js',
  'assets/json.worker-DghZTZS7.js',
  'assets/ts.worker-C4E4vgbE.js',
  'assets/editor.worker-DM0G1eFj.js',
  
  // Common helpers
  '_commonjsHelpers-CT9FvmAN.js',
  
  // NLS (internationalization)
  'nls.messages-loader.js',
  'nls.messages.fr.js',
  
  // CSS files
  'css-CaeNmE3S.js'
]

// Dossiers à copier entièrement (petits)
const essentialDirs = [
  'language/json',
  'language/css',
  'language/typescript',
  'assets'
]

async function copyMonacoESM() {
  try {
    console.log('[copy-monaco-esm] Cleaning destination...')
    await fs.remove(destinationPath)
    await fs.ensureDir(destinationPath)
    
    console.log('[copy-monaco-esm] Copying essential files...')
    
    // Copier les fichiers essentiels
    for (const file of essentialFiles) {
      const srcFile = path.join(sourcePath, file)
      const destFile = path.join(destinationPath, file)
      
      if (await fs.pathExists(srcFile)) {
        await fs.ensureDir(path.dirname(destFile))
        await fs.copy(srcFile, destFile)
        console.log(`  ✓ ${file}`)
      } else {
        console.log(`  ⚠ ${file} not found, skipping`)
      }
    }
    
    // Copier les dossiers essentiels
    for (const dir of essentialDirs) {
      const srcDir = path.join(sourcePath, dir)
      const destDir = path.join(destinationPath, dir)
      
      if (await fs.pathExists(srcDir)) {
        await fs.copy(srcDir, destDir)
        console.log(`  ✓ ${dir}/`)
      } else {
        console.log(`  ⚠ ${dir}/ not found, skipping`)
      }
    }
    
    // Créer un fichier de configuration ESM
    const esmConfig = {
      "version": "0.54.0",
      "languages": ["javascript", "css", "json"],
      "features": ["core", "json", "css", "typescript"],
      "workers": {
        "json": "/monaco/vs/assets/json.worker-DghZTZS7.js",
        "css": "/monaco/vs/assets/css.worker-cO8rX8Iy.js", 
        "typescript": "/monaco/vs/assets/ts.worker-C4E4vgbE.js",
        "editor": "/monaco/vs/assets/editor.worker-DM0G1eFj.js"
      }
    }
    
    await fs.writeJson(path.join(destinationPath, 'esm-config.json'), esmConfig, { spaces: 2 })
    console.log('  ✓ esm-config.json')
    
    console.log('[copy-monaco-esm] ESM Monaco setup complete!')
    console.log(`[copy-monaco-esm] Size: ${await getDirSize(destinationPath)}`)
    
  } catch (err) {
    console.error('[copy-monaco-esm] Error:', err)
    process.exit(1)
  }
}

async function getDirSize(dirPath) {
  let size = 0
  const files = await fs.readdir(dirPath, { withFileTypes: true })
  
  for (const file of files) {
    const filePath = path.join(dirPath, file.name)
    if (file.isDirectory()) {
      size += await getDirSize(filePath)
    } else {
      const stats = await fs.stat(filePath)
      size += stats.size
    }
  }
  
  return `${(size / 1024 / 1024).toFixed(2)} MB`
}

copyMonacoESM()
