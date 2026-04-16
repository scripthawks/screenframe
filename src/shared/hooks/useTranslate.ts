'use client'

import { useEffect } from 'react'

import { en } from '@/public/locales/en'
import { ru } from '@/public/locales/ru'
import { usePathname } from 'next/navigation'

export const useTranslate = () => {
  const pathname = usePathname()

  const locale = pathname.split('/')[1] || 'en'

  useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.cookie = `locale=${locale}; path=/; max-age=31536000`
  }, [locale])

  const t = locale === 'ru' ? ru : en

  return { locale, t }
}
