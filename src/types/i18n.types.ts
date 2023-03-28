export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'pt'],
} as const

export type Locale = (typeof i18n)['locales'][number]

export type DictionarySchema = {
  header: {
    title: string
    subtitle: string
  }
  chat: {
    initialMessage: string
    error: string
    placeholder: string
  }
  footer: {
    by: string
  }
}

export type Dictionaries = {
  [key: string]: () => Promise<DictionarySchema>
}
