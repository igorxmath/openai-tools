import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { i18n } from '@/types/i18n.types'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(5, '120 s'),
  ephemeralCache: new Map(),
  analytics: true,
})

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales
  return matchLocale(languages, locales, i18n.defaultLocale)
}

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<Response | undefined> {
  const pathname = request.nextUrl.pathname

  if (pathname.startsWith('/api/chat')) {
    const ip = request.ip ?? '127.0.0.1'

    const { success, pending, limit, reset, remaining } = await ratelimit.limit(
      `ratelimit_middleware_${ip}`,
    )
    event.waitUntil(pending)

    return success
      ? NextResponse.next()
      : new NextResponse('Too many requests in a given amount of time.', {
          status: 429,
          headers: {
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': reset.toString(),
          },
        })
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    return NextResponse.redirect(new URL(`/${locale}/${pathname}`, request.url))
  }
}

export const config = {
  matcher: ['/api/chat', '/((?!api|_next/static|_next/image|favicon.ico|.*.png|.*.xml).*)'],
}
