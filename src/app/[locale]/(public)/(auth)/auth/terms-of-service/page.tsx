'use client'

import { PrivacyAndTermsDynamic } from '@/features'
import { useTranslate } from '@/shared/hooks'

const TermsOfService = () => {
  const { t } = useTranslate()

  return (
    <PrivacyAndTermsDynamic
      pageName={t.auth.termsTitle}
      pageText={t.auth.privacyAndTerms.termsText}
    />
  )
}

export default TermsOfService
