import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { StoreProvider } from '@/app/StoreProvider'
import Script from 'next/script'

import '../globals.css'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = (await params) ?? 'en'

  return (
    <html lang={locale}>
      <body>
        <StoreProvider>{children}</StoreProvider>
        <ToastContainer
          autoClose={4000}
          closeOnClick
          draggable
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position={'bottom-left'}
        />
        <Script
          async
          defer
          src={'https://www.google.com/recaptcha/api.js'}
          strategy={'afterInteractive'}
        />
      </body>
    </html>
  )
}
