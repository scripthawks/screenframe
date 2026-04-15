import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const PasswordRecoveryDynamic = dynamic(
  () => import('./PasswordRecovery').then(mod => mod.PasswordRecovery),
  {
    loading: () => <Loader />,
  }
)
