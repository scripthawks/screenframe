import { LocalesType } from '@/public/locales/ru'
import { emailSchema } from '@/shared'
import { z } from 'zod'

export const expiredLinkSchema = (t: LocalesType) => {
  return z.object({
    email: emailSchema(t),
  })
}

export type ExpiredLinkSchema = z.infer<ReturnType<typeof expiredLinkSchema>>
