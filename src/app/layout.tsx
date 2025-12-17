import { ReactNode } from 'react'

import { StoreProvider } from '@/app/StoreProvider'

import './globals.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function RootLayout({ children, params }: Props) {
  const locale = params?.locale ?? 'en'

  return (
    <html lang={locale}>
      <body>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
