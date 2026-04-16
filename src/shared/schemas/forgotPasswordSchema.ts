import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

import { emailSchema } from './schemas'

export const forgotPasswordSchema = (t: LocalesType) => {
  return z.object({
    email: emailSchema(t),
    recaptchaToken: z.string().min(1, t.auth.authErrors.recaptcha.nonEmpty || 'Пройдите капчу'),
  })
}
export type ForgotPasswordSchema = z.infer<ReturnType<typeof forgotPasswordSchema>>
