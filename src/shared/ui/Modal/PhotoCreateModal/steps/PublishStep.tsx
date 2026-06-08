'use client'

import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import type { PhotoData } from '../PhotoCreateModal'
import { FILTER_CSS_MAP } from './FilterStep'
import { MAX_DESCRIPTION_LENGTH } from '@/shared/schemas/photoPostSchema'
import { Typography } from '@/shared/ui/Typography/Typography'
import s from './PublishStep.module.scss'

export type PublishStepProps = {
  photo: PhotoData
  description: string
  onDescriptionChange: (value: string) => void
  maxChars?: number
  isSubmitting?: boolean
}

export const PublishStep = ({
  photo,
  description,
  onDescriptionChange,
  maxChars = MAX_DESCRIPTION_LENGTH,
  isSubmitting = false,
}: PublishStepProps) => {
  const [charCount, setCharCount] = useState(description.length)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Синхронизация счётчика символов
  useEffect(() => {
    setCharCount(description.length)
  }, [description])

  // Авто-ресайз textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return

    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }, [description])

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    // Обрезаем если превысили лимит (дополнительная защита)
    if (value.length <= maxChars) {
      onDescriptionChange(value)
    }
  }

  const remainingChars = maxChars - charCount
  const isNearLimit = remainingChars <= 20

  return (
    <div className={s.container}>
      {/* Превью публикации */}
      <div className={s.previewCard}>
        <div className={s.imageWrapper}>
          <img
            src={photo.previewUrl}
            alt="Final preview"
            className={s.previewImage}
            style={{
              filter: FILTER_CSS_MAP[photo.filter],
              aspectRatio: photo.aspectRatio.replace(':', '/'),
              transform: `scale(${Math.min(photo.zoom, 1.2)})`,
              transformOrigin: 'center',
            }}
          />
          {/* Бейдж с параметрами (опционально) */}
          <div className={s.metaBadge}>
            <Typography variant={'boldText14'}>{photo.aspectRatio}</Typography>
            {photo.filter !== 'none' && (
              <Typography variant={'boldText14'}>• {photo.filter}</Typography>
            )}
          </div>
        </div>

        {/* Поле описания */}
        <div className={s.descriptionField}>
          <label htmlFor="post-description" className={s.label}>
            <Typography variant={'boldText14'}>Описание</Typography>
          </label>

          <textarea
            id="post-description"
            ref={textareaRef}
            className={clsx(s.textarea, isNearLimit && s.nearLimit)}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Добавьте описание (необязательно)..."
            maxLength={maxChars}
            rows={3}
            disabled={isSubmitting}
          />

          {/* Счётчик символов */}
          <div className={s.charCounter}>
            <Typography
              variant={'boldText14'}
              className={clsx(
                s.counterText,
                isNearLimit && s.warning,
                remainingChars === 0 && s.error
              )}
            >
              {charCount}/{maxChars}
            </Typography>
            {isNearLimit && remainingChars > 0 && (
              <Typography variant={'boldText14'} className={s.hint}>
                Осталось: {remainingChars}
              </Typography>
            )}
          </div>
        </div>
      </div>

      {/* Статус отправки */}
      {isSubmitting && (
        <div className={s.submittingOverlay}>
          <div className={s.spinner} />
          <Typography variant={'boldText14'}>Публикация...</Typography>
        </div>
      )}
    </div>
  )
}
