import 'server-only'
import { i18n, Locale, Dictionaries } from '@/types/i18n.types'

const dictionaries: Dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]()
