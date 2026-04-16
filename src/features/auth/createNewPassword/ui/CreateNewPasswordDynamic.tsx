import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const CreateNewPasswordDynamic = dynamic(
  () => import('./CreateNewPassword').then(mod => mod.CreateNewPassword),
  {
    loading: () => <Loader />,
  }
)
