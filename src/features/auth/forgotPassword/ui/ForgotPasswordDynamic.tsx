import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const ForgotPasswordDynamic = dynamic(
  () => import('./ForgotPassword').then(mod => mod.ForgotPassword),
  {
    loading: () => <Loader />,
  }
)
