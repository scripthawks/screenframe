import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

import { emailSchema, passwordSchema } from './schemas'

export const createSignUpSchema = (t: LocalesType) => {
  return z
    .object({
      agreeToTerms: z.boolean().refine(value => value, {
        message: t.auth.authErrors.terms,
      }),
      email: emailSchema(t),
      password: passwordSchema(t),
      passwordConfirmation: z.string().trim().nonempty(t.auth.authErrors.passwordConfirmation),
      username: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.username.nonEmpty)
        .min(6, t.auth.authErrors.username.min)
        .max(30, t.auth.authErrors.username.min)
        .regex(/^[0-9A-Za-z_-]+$/, t.auth.authErrors.username.regex),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirmation'],
    })
}

export type SignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>
