'use client'

import { PrivacyAndTermsDynamic } from '@/features'
import { useTranslate } from '@/shared/hooks'

const PrivacyPolicy = () => {
  const { t } = useTranslate()

  return (
    <PrivacyAndTermsDynamic
      pageName={t.auth.policyTitle}
      pageText={t.auth.privacyAndTerms.privacyText}
    />
  )
}

export default PrivacyPolicy
