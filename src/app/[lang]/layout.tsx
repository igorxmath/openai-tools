import '@/styles/globals.css'
import { AnalyticsWrapper } from '@/components/analytics'
import { Inter } from 'next/font/google'
import { Locale, i18n } from '@/types/i18n.types'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OpenAi GPT-3 Playground',
  description: 'A playground for OpenAI GPT-3',
  twitter: {
    title: 'OpenAi GPT-3 Playground',
    card: 'summary_large_image',
  },
  openGraph: {
    title: 'OpenAi GPT-3 Playground',
    siteName: 'OpenAi GPT-3 Playground',
    description: 'A playground for OpenAI GPT-3',
    url: 'https://ai.igormatheus.com.br/',
    type: 'website',
    locale: 'pt-BR',
    images: [
      {
        url: 'https://ai.igormatheus.com.br/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
