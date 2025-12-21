import { en } from '@/public/locales/en'
import { ru } from '@/public/locales/ru'
import { usePathname } from 'next/navigation'

export const useTranslate = () => {
  const pathname = usePathname()

  const locale = pathname.split('/')[1] || 'en'

  const t = locale === 'ru' ? ru : en

  return { locale, t }
}
