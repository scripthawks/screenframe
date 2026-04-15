import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const PrivacyAndTermsDynamic = dynamic(
  () => import('./PrivacyAndTerms').then(mod => mod.PrivacyAndTerms),
  {
    loading: () => <Loader />,
  }
)
