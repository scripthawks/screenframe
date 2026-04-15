import { RoutesNames, useTranslate } from '@/shared'
import { redirect } from 'next/navigation'

export default function RootPage() {
  const { locale } = useTranslate()

  redirect(`/${locale}/${RoutesNames.MAIN_PAGE}`)
}
