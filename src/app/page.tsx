'use client'

import { useTranslate } from '@/shared'
import { redirect } from 'next/navigation'

export default function RootPage() {
  const { locale } = useTranslate()

  redirect(`/${locale}`)
}
