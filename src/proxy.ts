import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED_LOCALES = ['en', 'ru'] as const
const DEFAULT_LOCALE = 'en'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.match(/\.[0-9a-z]+$/i)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split('/').filter(Boolean)
  const first = segments[0]

  if (first && SUPPORTED_LOCALES.includes(first as any)) {
    return NextResponse.next()
  }

  const newPathname = '/' + [DEFAULT_LOCALE, ...segments].join('/')
  const url = new URL(request.url)

  url.pathname = newPathname

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
