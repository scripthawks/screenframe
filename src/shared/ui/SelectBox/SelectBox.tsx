'use client'

import { forwardRef, ReactElement, useImperativeHandle, useRef, useState } from 'react'

import { Typography } from '@/shared'
import { ArrowIosDownOutline } from '@/shared/assets/icons'
import * as Select from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './SelectBox.module.scss'

export type Option = {
  id?: number | string
  image?: ReactElement
  value: string
  label?: string
}

type SelectProps = {
  options: Option[]
  value?: string
  onChange?: (val: string) => void
  disabled?: boolean
  label?: string
  className?: string
  isMobile?: boolean
  variant?: 'desktop' | 'mobileLang' | 'pagination'
}

const SelectBox = forwardRef<HTMLButtonElement, SelectProps>(
  ({ className, disabled, isMobile, label, onChange, options, value, variant }, ref) => {
    const SELECT_CONTENT_VISIBLE_HEIGHT = 109
    const localTriggerRef = useRef<HTMLButtonElement>(null)

    useImperativeHandle(ref, () => localTriggerRef.current as HTMLButtonElement, [])

    const [contentWidth, setContentWidth] = useState<number>()

    const selectedOption = options.find(option => option.value === value)

    const handleOpenChange = (open: boolean) => {
      if (open && localTriggerRef.current) {
        const width = localTriggerRef.current.offsetWidth

        setContentWidth(width)
      }
    }

    return (
      <div className={className}>
        {label && (
          <Typography as={'span'} className={s.inputLabel} variant={'regularText14'}>
            {label}
          </Typography>
        )}
        <Select.Root
          disabled={disabled}
          onOpenChange={handleOpenChange}
          onValueChange={value => onChange?.(value)}
          value={value}
        >
          <Select.Trigger className={clsx(variant && s[variant], s.trigger)} ref={localTriggerRef}>
            <div className={s.triggerValue}>
              {selectedOption?.image && <span className={s.icon}>{selectedOption.image}</span>}
              {variant !== 'mobileLang' ? (
                <Select.Value placeholder={selectedOption?.value} />
              ) : null}
            </div>
            <Select.Icon className={s.selectedIcon}>
              <ArrowIosDownOutline height={isMobile ? 16 : 24} width={isMobile ? 16 : 24} />
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content
              className={clsx(s.content, variant && s[variant])}
              position={'popper'}
              sideOffset={-1}
              style={{
                maxHeight: SELECT_CONTENT_VISIBLE_HEIGHT,
                width: variant !== 'mobileLang' ? contentWidth : 'inherit',
              }}
            >
              <Select.Viewport>
                {options.map(option => (
                  <Select.Item className={s.item} key={option.id} value={option.value}>
                    {option.image && <span className={s.icon}>{option.image}</span>}
                    <Select.ItemText>{option.label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    )
  }
)

SelectBox.displayName = 'SelectBox'

export { SelectBox }
