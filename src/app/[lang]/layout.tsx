import '@/styles/globals.css'
import { AnalyticsWrapper } from '@/components/analytics'
import { Inter } from 'next/font/google'
import { Locale, i18n } from '@/types/i18n.types'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenAi GPT-3 Playground',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  return (
    <html
      lang={params.lang}
      className={inter.className}
    >
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  )
}
