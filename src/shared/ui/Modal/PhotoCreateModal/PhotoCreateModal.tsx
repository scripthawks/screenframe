'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { UploadStep } from './steps/UploadStep'
import { AdjustStep } from './steps/AdjustStep'
import { FilterStep } from './steps/FilterStep'
import { PublishStep } from './steps/PublishStep'

import s from './PhotoCreateModal.module.scss'
import { PhotoFile, photoPostSchema } from '@/shared/schemas/photoPostSchema'
import { BaseModal, ModalSize } from '../BaseModal'
import { Typography } from '../../Typography/Typography'
import { CropCoords, getCroppedBlob } from './utils/cropImage'

export type WizardStep = 'upload' | 'adjust' | 'filters' | 'publish'

export type PhotoData = {
  id: string
  file: PhotoFile
  previewUrl: string
  croppedBlob?: Blob
  aspectRatio: '1:1' | '4:5' | '9:16'
  zoom: number
  filter: 'none' | 'clarendon' | 'gingham' | 'lark' | 'moon'
}

export type PhotoCreateModalProps = {
  open: boolean
  onClose: () => void
  onSuccess?: (postId: string) => void
}

export const PhotoCreateModal = ({ open, onClose, onSuccess }: PhotoCreateModalProps) => {
  const [step, setStep] = useState<WizardStep>('upload')
  const [photos, setPhotos] = useState<PhotoData[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const cleanupUrls = useRef<Set<string>>(new Set())

  // Очистка blob-URL при закрытии
  useEffect(() => {
    if (!open) {
      cleanupUrls.current.forEach(url => URL.revokeObjectURL(url))
      cleanupUrls.current.clear()
      resetState()
    }
    return () => {
      cleanupUrls.current.forEach(url => URL.revokeObjectURL(url))
      cleanupUrls.current.clear()
    }
  }, [open])

  const resetState = () => {
    setStep('upload')
    setPhotos([])
    setActiveIndex(0)
    setDescription('')
    setErrors({})
    setIsSubmitting(false)
  }

  const activePhoto = photos[activeIndex]

  // Обработка загрузки фоток
  const handleFilesAccepted = useCallback((files: File[]) => {
    const parsed = photoPostSchema.safeParse({ photos: files })
    if (!parsed.success) {
      setErrors({ files: parsed.error.issues.map(e => e.message) })
      return
    }

    const newPhotos: PhotoData[] = parsed.data.photos.map(file => {
      const url = URL.createObjectURL(file)
      cleanupUrls.current.add(url)
      return {
        id: crypto.randomUUID(),
        file,
        previewUrl: url,
        aspectRatio: '1:1',
        zoom: 1,
        filter: 'none',
      }
    })

    setPhotos(newPhotos)
    setErrors({})
    setStep('adjust')
  }, [])

  // Обработка
  const handleCropComplete = useCallback(
    async (cropCoords: CropCoords) => {
      if (!activePhoto) return

      try {
        const croppedBlob = await getCroppedBlob(activePhoto.previewUrl, cropCoords)

        setPhotos(prev => {
          const next = [...prev]
          next[activeIndex] = { ...next[activeIndex], croppedBlob }
          return next
        })
      } catch (error) {
        console.error('Crop error', error)
        setErrors(prev => ({
          ...prev,
          crop: ['Ошибка обработки изображения. Попробуйте ещё раз.'],
        }))
      }
    },
    [activePhoto, activeIndex]
  )

  // Фильтр
  const handleApplyFilter = useCallback(
    (filter: PhotoData['filter']) => {
      setPhotos(prev => {
        const next = [...prev]
        next[activeIndex] = { ...next[activeIndex], filter }
        return next
      })
    },
    [activeIndex]
  )

  // Изменение масштаба
  const handleUpdateAspectRatio = useCallback(
    (ratio: PhotoData['aspectRatio']) => {
      setPhotos(prev => {
        const next = [...prev]
        next[activeIndex] = { ...next[activeIndex], aspectRatio: ratio }
        return next
      })
    },
    [activeIndex]
  )

  // Изменение зума
  const handleUpdateZoom = useCallback(
    (zoom: number) => {
      setPhotos(prev => {
        const next = [...prev]
        next[activeIndex] = { ...next[activeIndex], zoom }
        return next
      })
    },
    [activeIndex]
  )

  // Шаги
  const handleNext = useCallback(() => {
    if (step === 'upload' && photos.length === 0) {
      setErrors({ files: ['Добавьте хотя бы одну фотографию'] })
      return
    }
    if (step === 'adjust') return setStep('filters')
    if (step === 'filters') return setStep('publish')
  }, [step, photos.length])

  const handleBack = useCallback(() => {
    switch (step) {
      case 'adjust':
        return setStep('upload')
      case 'filters':
        return setStep('adjust')
      case 'publish':
        return setStep('filters')
      default:
        return onClose()
    }
  }, [step, onClose])

  // Публикация
  const handlePublish = useCallback(async () => {
    const parsed = photoPostSchema.safeParse({
      photos: photos.map(p => p.file),
      description: description.trim() || undefined,
    })

    if (!parsed.success) {
      const flattened = parsed.error.flatten()
      setErrors({ files: flattened.fieldErrors.photos || [], form: flattened.formErrors || [] })
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      // 📦 Формирование FormData
      const formData = new FormData()
      photos.forEach((photo, i) => {
        const blob = photo.croppedBlob || photo.file
        formData.append(`photos[${i}]`, blob, `photo_${i}.jpg`)
        formData.append(`aspectRatios[${i}]`, photo.aspectRatio)
        formData.append(`filters[${i}]`, photo.filter)
      })
      formData.append('description', description)

      // 🌐 API-запрос
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData,
        // headers: { 'Authorization': `Bearer ${token}` }
      })

      if (!response.ok) throw new Error('Ошибка публикации')

      const result = await response.json()
      onSuccess?.(result.postId)
      onClose()
    } catch (error) {
      setErrors({ form: [error instanceof Error ? error.message : 'Не удалось опубликовать'] })
    } finally {
      setIsSubmitting(false)
    }
  }, [photos, description, onSuccess, onClose])

  // Определение кнопок модалки в зависимости от шага
  const modalProps = useMemo(() => {
    const base = {
      open,
      onClose,
      modalSize: 'large' as ModalSize,
      className: s.modalRoot,
    }

    const stepTitles: Record<WizardStep, string> = {
      upload: 'Add Photo',
      adjust: 'Cropping',
      filters: 'Filters',
      publish: 'Publish',
    }

    switch (step) {
      case 'upload':
        return {
          ...base,
          title: stepTitles.upload,
          actionButtonName: undefined,
          cancelButtonName: undefined,
          onCancel: onClose,
          showSeparator: true,
        }
      case 'adjust':
      case 'filters':
        return {
          ...base,
          title: stepTitles[step],
          actionButtonName: 'Next',
          cancelButtonName: 'Back',
          onAction: handleNext,
          onCancel: handleBack,
          showSeparator: true,
        }
      case 'publish':
        return {
          ...base,
          title: stepTitles.publish,
          actionButtonName: isSubmitting ? 'Publication...' : 'Publish',
          cancelButtonName: 'Back',
          onAction: handlePublish,
          onCancel: handleBack,
          showSeparator: false,
          fullWidthButton: true,
        }
    }
  }, [step, open, onClose, handleNext, handleBack, handlePublish, isSubmitting])

  return (
    <BaseModal {...modalProps}>
      <div className={s.wizardContent}>
        {/* Рендер шагов */}
        {step === 'upload' && (
          <UploadStep onFilesAccepted={handleFilesAccepted} errors={errors.files || []} />
        )}

        {step === 'adjust' && activePhoto && (
          <AdjustStep
            photos={photos}
            activeIndex={activeIndex}
            onSelectPhoto={setActiveIndex}
            onUpdateAspectRatio={handleUpdateAspectRatio}
            onUpdateZoom={handleUpdateZoom}
            onCropComplete={handleCropComplete}
          />
        )}

        {step === 'filters' && activePhoto && (
          <FilterStep photo={activePhoto} onApplyFilter={handleApplyFilter} />
        )}

        {step === 'publish' && activePhoto && (
          <PublishStep
            photo={activePhoto}
            description={description}
            onDescriptionChange={setDescription}
            maxChars={500}
          />
        )}
      </div>
      {/* Ошибки формы */}
      {errors.form && (
        <Typography variant={'regularText14'} className={s.errorBanner}>
          {errors.form.join(', ')}
        </Typography>
      )}
    </BaseModal>
  )
}
