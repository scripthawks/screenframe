import z from 'zod'

export const MAX_FILE_SIZE = 20 * 1024 * 1024
export const ALLOWED_FORMAT_TYPES = ['image/jpeg', 'image/png'] as const
export const MAX_COUNT_PHOTOS = 10
export const MAX_DESCRIPTION_LENGTH = 500

export const photoFileSchema = z
  .instanceof(File)
  .refine(file => file.size <= MAX_FILE_SIZE, {
    message: `Размер файла не должен превышать 20 МБ`,
  })
  .refine(
    file => ALLOWED_FORMAT_TYPES.includes(file.type as (typeof ALLOWED_FORMAT_TYPES)[number]),
    { message: `Допустимые форматы изображений: JPEG и PNG` }
  )

export const photoPostSchema = z.object({
  photos: z
    .array(photoFileSchema)
    .min(1, `Добавьте фотографию`)
    .max(MAX_COUNT_PHOTOS, `Можно добавить только ${MAX_COUNT_PHOTOS} фотографий`),
  description: z
    .string()
    .max(MAX_DESCRIPTION_LENGTH, `Не более ${MAX_DESCRIPTION_LENGTH} символов`)
    .optional(),
  aspectRatios: z.array(z.enum([`1:1`, `4:5`, `9:16`])).optional(),
  filters: z.array(z.enum([`none`, `clarendon`, 'gingham', 'lark', 'moon'])).optional(),
})

export type PhotoPostInput = z.infer<typeof photoPostSchema>
export type PhotoFile = z.infer<typeof photoFileSchema>

// Утилита для парсинга с возвратом ошибок в удобном формате
export const parsePhotoPost = (data: Partial<PhotoPostInput>) => {
  return photoPostSchema.safeParse(data)
}
