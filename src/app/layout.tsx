import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

import { StoreProvider } from '@/app/StoreProvider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

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
        <ToastContainer
          autoClose={4000}
          closeOnClick
          draggable
          pauseOnFocusLoss={false}
          pauseOnHover={false}
          position={'bottom-left'}
        />
      </body>
    </html>
  )
}
