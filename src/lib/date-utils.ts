export function formatDate(dateString: string, locale: string = 'fr-FR'): string {
  const date = new Date(dateString)
  
  // Format d.m.Y pour tous les locales
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  
  return `${day}.${month}.${year}`
}

export function formatDateForLocale(dateString: string, locale: string): string {
  const date = new Date(dateString)
  
  // Format d.m.Y pour tous les locales
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear()
  
  return `${day}.${month}.${year}`
}
