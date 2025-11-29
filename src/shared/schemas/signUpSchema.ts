import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

export const createSignUpSchema = (t: LocalesType) => {
  return z
    .object({
      username: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.username.nonEmpty)
        .min(6, t.auth.authErrors.username.min)
        .max(30, t.auth.authErrors.username.min)
        .regex(/^[0-9A-Za-z_-]+$/, t.auth.authErrors.username.regex),
      email: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.email.nonEmpty)
        .pipe(z.email(t.auth.authErrors.email.incorrect)),
      password: z
        .string()
        .trim()
        .nonempty(t.auth.authErrors.password.nonEmpty)
        .min(6, t.auth.authErrors.password.min)
        .max(20, t.auth.authErrors.password.max)
        .regex(
          /^[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
          t.auth.authErrors.password.regex
        ),
      passwordConfirm: z.string().trim().nonempty(t.auth.authErrors.passwordConfirm),
      agreeToTerms: z.boolean().refine(value => value),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: t.auth.authErrors.refine,
      path: ['passwordConfirm'],
    })
}

export type SignUpSchema = z.infer<ReturnType<typeof createSignUpSchema>>
