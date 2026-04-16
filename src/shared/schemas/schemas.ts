import { LocalesType } from '@/public/locales/ru'
import { z } from 'zod'

export const emailSchema = (t: LocalesType) =>
  z
    .string()
    .trim()
    .nonempty(t.auth.authErrors.email.nonEmpty)
    .pipe(z.email(t.auth.authErrors.email.incorrect))

export const passwordSchema = (t: LocalesType) =>
  z
    .string()
    .trim()
    .nonempty(t.auth.authErrors.password.nonEmpty)
    .min(6, t.auth.authErrors.password.min)
    .max(20, t.auth.authErrors.password.max)
    .refine(val => /[a-z]/.test(val), t.auth.authErrors.password.lowerCase)
    .refine(val => /[A-Z]/.test(val), t.auth.authErrors.password.upperCase)
    .refine(val => /\d/.test(val), t.auth.authErrors.password.digit)
    .refine(
      val => /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(val),
      t.auth.authErrors.password.specialChar
    )
    .refine(
      val => /^[0-9a-zA-Z!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/.test(val),
      t.auth.authErrors.password.regex
    )
