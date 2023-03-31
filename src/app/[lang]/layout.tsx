import '@/styles/globals.css'
import { AnalyticsWrapper } from '@/components/analytics'
import { Inter } from 'next/font/google'
import { Locale, i18n } from '@/types/i18n.types'

const inter = Inter({ subsets: ['latin'] })

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function Layout({
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
