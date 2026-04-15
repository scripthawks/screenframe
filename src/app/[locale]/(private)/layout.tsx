import { ReactNode } from 'react'

import { RoutesProvider } from '@/shared/hoc'

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return <RoutesProvider>{children}</RoutesProvider>
}
