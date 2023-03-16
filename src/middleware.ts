import { NextResponse } from 'next/server'
import type { NextRequest, NextFetchEvent } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.cachedFixedWindow(4, '240 s'),
  ephemeralCache: new Map(),
  analytics: true,
})

export default async function middleware(
  request: NextRequest,
  event: NextFetchEvent,
): Promise<Response | undefined> {
  const ip = request.ip ?? '127.0.0.1'

  const { success, pending } = await ratelimit.limit(`ratelimit_middleware_${ip}`)
  event.waitUntil(pending)

  return success
    ? NextResponse.next()
    : new NextResponse('Too many requests in a given amount of time', { status: 429 })
}

export const config = {
  matcher: '/api/chat',
}
