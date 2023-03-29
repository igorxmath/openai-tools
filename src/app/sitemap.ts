import { i18n } from '@/types/i18n.types'

export default async function sitemap() {
  const locales = i18n.locales.map((locale) => `/${locale}`)

  const routes = ['', ...locales].map((route) => ({
    url: `https://ai.igormatheus.com.br${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
