import { Loader } from '@/shared/ui/Loader/Loader'
import dynamic from 'next/dynamic'

export const SignInDynamic = dynamic(() => import('./SignIn').then(mod => mod.SignIn), {
  loading: () => <Loader />,
})
