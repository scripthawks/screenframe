import { Typography } from '@/shared/ui/Typography/Typography'
import { useCallback } from 'react'
import { type FileRejection, useDropzone } from 'react-dropzone'
import { MAX_FILE_SIZE } from '@/shared/schemas'
import s from './UploadStep.module.scss'
import { ImageOutline } from '@/shared/assets/icons'

type UploadStepProps = {
  onFilesAccepted: (files: File[]) => void
  errors: string[]
}

export const UploadStep = ({ onFilesAccepted, errors }: UploadStepProps) => {
  const onDrop = useCallback(
    (accepted: File[], rejected: FileRejection[]) => {
      if (rejected.length > 0) {
        const msgs = rejected.map(r => r.errors[0]?.message).filter(Boolean)
      }
      if (accepted.length > 0) {
        onFilesAccepted(accepted)
      }
    },
    [onFilesAccepted]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [] },
    maxSize: MAX_FILE_SIZE,
    maxFiles: 10,
    multiple: true,
  })

  return (
    <div className={s.container}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type={'button'} className={s.preview}>
          <ImageOutline width={'48px'} height={'48px'} />
        </button>
      </div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type={'button'} className={s.selectButton}>
          Select from Computer
        </button>
        {errors.map((err, i) => (
          <Typography key={i} variant={'small'}>
            ⚠️ {err}
          </Typography>
        ))}
      </div>
    </div>
  )
}
