import { Typography } from '@/shared/ui/Typography/Typography'
import { useCallback, useState } from 'react'
import Cropper from 'react-easy-crop'
import { PhotoData } from '../PhotoCreateModal'
import s from './AdjustStep.module.scss'
import { CropCoords } from '../utils/cropImage'
import clsx from 'clsx'

export type AdjustStepProps = {
  photos: PhotoData[]
  activeIndex: number
  onSelectPhoto: (index: number) => void
  onUpdateAspectRatio: (ratio: '1:1' | '4:5' | '9:16') => void
  onUpdateZoom: (zoom: number) => void
  onCropComplete: (crop: CropCoords) => void
}

const ASPECT_MAP = { '1:1': 1, '4:5': 4 / 5, '9:16': 9 / 16 } as const

export const AdjustStep = ({
  photos,
  activeIndex,
  onSelectPhoto,
  onUpdateAspectRatio,
  onUpdateZoom,
  onCropComplete,
}: AdjustStepProps) => {
  const photo = photos[activeIndex]
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const handleCropComplete = useCallback(
    (_: any, pixelCrop: { x: number; y: number; width: number; height: number }) => {
      onCropComplete(pixelCrop)
    },
    [onCropComplete]
  )

  return (
    <div>
      <div>
        {photos.length > 1 && (
          <div className={s.thumbnailsStrip} role="list">
            {photos.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="listitem"
                className={clsx(s.thumbnailBtn, activeIndex === i && s.active)}
                onClick={() => onSelectPhoto(i)}
                aria-pressed={activeIndex === i}
              >
                <img
                  key={p.id}
                  src={p.previewUrl}
                  alt={`thumb-${i}`}
                  onClick={() => onSelectPhoto(i)}
                />

                {activeIndex === i && <span className={s.activeIndicator} />}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={s.containerCropper}>
        <Cropper
          image={photo.previewUrl}
          crop={crop}
          zoom={zoom}
          aspect={ASPECT_MAP[photo.aspectRatio]}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
          cropShape="rect"
          showGrid={false}
        />
      </div>

      {/* Контролы */}
      <div>
        <div>
          {(['1:1', '4:5', '9:16'] as const).map(ratio => (
            <button key={ratio} onClick={() => onUpdateAspectRatio(ratio)}>
              {ratio}
            </button>
          ))}
        </div>
        <div>
          <Typography variant={'boldText14'}>Приближение: {zoom.toFixed(1)} x</Typography>
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={e => {
              const val = parseFloat(e.target.value)
              setZoom(val)
              onUpdateZoom(val)
            }}
          />
        </div>
      </div>
    </div>
  )
}
