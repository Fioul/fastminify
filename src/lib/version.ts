// Import dynamique pour éviter les problèmes de cache Next.js
let packageJson: any = null

const loadPackageJson = async () => {
  if (!packageJson) {
    try {
      packageJson = await import('../../package.json')
    } catch (error) {
      console.warn('Could not load package.json, using fallback version')
      packageJson = { version: '1.0.1' }
    }
  }
  return packageJson
}

export const getVersion = (): string => {
  // Fallback immédiat pour éviter les problèmes de SSR
  return '1.0.1'
}

export const getVersionAsync = async (): Promise<string> => {
  const pkg = await loadPackageJson()
  return pkg.version || '1.0.1'
}

export const getVersionInfo = async () => {
  const pkg = await loadPackageJson()
  return {
    version: pkg.version || '1.0.1',
    name: pkg.name || 'fastminify',
    description: pkg.description || 'Free, fast and private online JavaScript, CSS and JSON minifier'
  }
}
