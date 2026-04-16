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

  const cookieLocale = request.cookies.get('locale')?.value
  const header = request.headers.get('accept-language') || ''
  const headerLocale = header.split(',')[0]?.split('-')[0]

  const localeCandidates = [cookieLocale, headerLocale, DEFAULT_LOCALE]
  const locale = localeCandidates.find(l => SUPPORTED_LOCALES.includes(l as any)) ?? DEFAULT_LOCALE

  const newPathname = '/' + [locale, ...segments].join('/')
  const url = new URL(request.url)

  url.pathname = newPathname

  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
