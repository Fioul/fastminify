// Source unique de vérité: injectée par Next via next.config.ts (npm_package_version)

const fallbackVersion = '1.0.0'

export const getVersion = (): string => {
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_APP_VERSION) {
    return process.env.NEXT_PUBLIC_APP_VERSION
  }
  if (typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_APP_VERSION) {
    return (window as any).NEXT_PUBLIC_APP_VERSION
  }
  return fallbackVersion
}

export const getVersionAsync = async (): Promise<string> => getVersion()

export const getVersionInfo = async () => {
  return {
    version: getVersion(),
    name: 'fastminify',
    description: 'Free, fast and private online JavaScript, CSS and JSON minifier',
  }
}
