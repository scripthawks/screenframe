export const withLocale = (locale: string, path: string) =>
  `/${locale}${path.startsWith('/') ? path : `/${path}`}`
