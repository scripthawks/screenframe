import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

import { emailSchema, passwordSchema } from './schemas'

export const createSignInSchema = (t: LocalesType) => {
  return z.object({
    email: emailSchema(t),
    password: passwordSchema(t),
  })
}

export type SignInSchema = z.infer<ReturnType<typeof createSignInSchema>>
