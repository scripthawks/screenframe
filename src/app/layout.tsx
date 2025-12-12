import { ReactNode } from 'react'

import './globals.css'

type Props = {
  children: ReactNode
  params: { locale: string }
}

export default function RootLayout({ children, params }: Props) {
  const locale = params?.locale ?? 'en'

  return (
    <html lang={locale}>
      <body>{children}</body>
    </html>
  )
}
