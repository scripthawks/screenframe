import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

import { passwordSchema } from './schemas'

export const createNewPasswordSchema = (t: LocalesType) => {
  return z
    .object({
      password: passwordSchema(t),
      passwordConfirmation: z.string().trim().nonempty(t.auth.authErrors.passwordConfirmation),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirmation'],
    })
}

export type CreateNewPasswordSchema = z.infer<ReturnType<typeof createNewPasswordSchema>>
