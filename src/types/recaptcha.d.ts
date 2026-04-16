interface ReCaptchaV2 {
  render: (container: string | HTMLElement, options: any) => number
  reset: (widgetId?: number) => void
  getResponse: (widgetId?: number) => string
}

declare global {
  interface Window {
    grecaptcha: ReCaptchaV2
  }
}

export {}
