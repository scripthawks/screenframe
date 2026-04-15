'use client'

import { useEffect, useRef } from 'react'

import { RECAPTCHA_PUBLIC_KEY } from '@/shared'
import { clsx } from 'clsx'

interface GoogleRecaptchaProps {
  onVerify: (token: string) => void
  className?: string
}

export const GoogleRecaptcha = ({ className, onVerify }: GoogleRecaptchaProps) => {
  const recaptchaRef = useRef<HTMLDivElement>(null)
  const widgetId = useRef<number | null>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (isInitialized.current) {
      return
    }

    const siteKey = RECAPTCHA_PUBLIC_KEY

    const initRecaptcha = () => {
      if (
        isInitialized.current ||
        !recaptchaRef.current ||
        !window.grecaptcha ||
        widgetId.current !== null
      ) {
        return
      }

      recaptchaRef.current.innerHTML = ''

      widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
        callback: (token: string) => {
          onVerify(token)
        },
        sitekey: siteKey,
        size: 'normal',
        theme: 'light',
      })

      isInitialized.current = true
    }

    if (!document.querySelector('script[src*="recaptcha/api.js"]')) {
      const script = document.createElement('script')

      script.src = `https://www.google.com/recaptcha/api.js?render=explicit`
      script.async = true
      script.defer = true
      script.onload = initRecaptcha
      document.head.appendChild(script)
    } else {
      initRecaptcha()
    }

    return () => {
      if (widgetId.current !== null && window.grecaptcha) {
        window.grecaptcha.reset(widgetId.current)
        widgetId.current = null
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={clsx(className)}
      ref={recaptchaRef}
      style={{
        border: '1px solid transparent',
        minHeight: '78px',
        width: '304px',
      }}
    />
  )
}
