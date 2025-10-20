const fs = require('fs')
const path = require('path')

function analyzeBundle() {
  console.log('🔍 Analyzing bundle sizes...\n')
  
  // Read the build output
  const buildPath = path.join(__dirname, '../.next')
  
  if (!fs.existsSync(buildPath)) {
    console.log('❌ Build directory not found. Run "npm run build" first.')
    return
  }
  
  // Analyze static chunks
  const staticPath = path.join(buildPath, 'static/chunks')
  if (fs.existsSync(staticPath)) {
    const chunks = fs.readdirSync(staticPath)
    console.log('📦 Static chunks:')
    
    let totalSize = 0
    chunks.forEach(chunk => {
      const chunkPath = path.join(staticPath, chunk)
      const stats = fs.statSync(chunkPath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      totalSize += stats.size
      
      console.log(`  ${chunk}: ${sizeKB} KB`)
    })
    
    console.log(`\n📊 Total static chunks: ${(totalSize / 1024).toFixed(2)} KB`)
  }
  
  // Analyze CSS
  const cssPath = path.join(buildPath, 'static/css')
  if (fs.existsSync(cssPath)) {
    const cssFiles = fs.readdirSync(cssPath)
    console.log('\n🎨 CSS files:')
    
    let totalCSS = 0
    cssFiles.forEach(file => {
      const filePath = path.join(cssPath, file)
      const stats = fs.statSync(filePath)
      const sizeKB = (stats.size / 1024).toFixed(2)
      totalCSS += stats.size
      
      console.log(`  ${file}: ${sizeKB} KB`)
    })
    
    console.log(`\n📊 Total CSS: ${(totalCSS / 1024).toFixed(2)} KB`)
  }
  
  console.log('\n✅ Bundle analysis complete!')
}

analyzeBundle()
