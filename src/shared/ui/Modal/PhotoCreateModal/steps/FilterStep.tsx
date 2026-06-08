'use client'

import { useMemo } from 'react'
import { PhotoData } from '../PhotoCreateModal'
import { Typography } from '@/shared/ui/Typography/Typography'
import s from './FilterStep.module.scss'
import clsx from 'clsx'

export type FilterPreset = 'none' | 'clarendon' | 'gingham' | 'lark' | 'moon'

export const FILTER_CSS_MAP: Record<FilterPreset, string> = {
  none: 'none',
  clarendon: 'contrast(1.2) saturate(1.35) brightness(1.05)',
  gingham: 'brightness(1.05) contrast(0.95) sepia(0.15) hue-rotate(-10deg)',
  lark: 'contrast(0.9) brightness(1.15) saturate(1.2) sepia(0.1)',
  moon: 'grayscale(1) contrast(1.1) brightness(1.1)',
}

export const FILTER_THUMB_MAP: Record<FilterPreset, string> = {
  none: 'none',
  clarendon: 'contrast(1.3) saturate(1.5)',
  gingham: 'brightness(1.1) contrast(0.9) sepia(0.25)',
  lark: 'contrast(0.85) brightness(1.2) saturate(1.3)',
  moon: 'grayscale(1) contrast(1.2)',
}

export type FilterStepProps = {
  photo: PhotoData
  onApplyFilter: (filter: FilterPreset) => void
}

export const FilterStep = ({ photo, onApplyFilter }: FilterStepProps) => {
  const filters: FilterPreset[] = useMemo(
    () => ['none', 'clarendon', 'gingham', 'lark', 'moon'],
    []
  )
  return (
    <div className={s.container}>
      {/* Основное превью с фильтром */}
      <div className={s.previewWrapper}>
        <img
          src={photo.previewUrl}
          alt="Preview with filter"
          className={s.previewImage}
          style={{
            filter: FILTER_CSS_MAP[photo.filter],
            aspectRatio: photo.aspectRatio.replace(':', '/'),
            transform: `scale(${Math.min(photo.zoom, 1.5)})`,
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* Полоса выбора фильтров */}
      <div className={s.filterStrip}>
        {filters.map(f => (
          <button
            key={f}
            type="button"
            className={clsx(s.filterItem, photo.filter === f && s.active)}
            aria-pressed={photo.filter === f}
            onClick={() => onApplyFilter(f)}
          >
            <div className={s.thumbWrapper}>
              <img
                src={photo.previewUrl}
                alt={f}
                className={s.filterThumb}
                style={{ filter: FILTER_THUMB_MAP[f] }}
              />
              {/* Индикатор выбора */}
              {photo.filter === f && <div className={s.selectedIndicator} />}
            </div>
            <Typography variant="boldText14" className={s.filterName}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Typography>
          </button>
        ))}
      </div>
    </div>
  )
}
