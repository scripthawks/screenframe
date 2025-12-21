import { Loader } from '@/shared'
import dynamic from 'next/dynamic'

export const SignUpDynamic = dynamic(() => import('./SignUp').then(mod => mod.SignUp), {
  loading: () => <Loader />,
})
