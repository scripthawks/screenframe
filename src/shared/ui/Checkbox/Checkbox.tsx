import { ComponentPropsWithRef, ReactNode } from 'react'

import { Typography } from '@/shared'
import { CheckmarkOutline } from '@/shared/assets/icons'
import * as CheckboxRadix from '@radix-ui/react-checkbox'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

export type CheckboxProps = {
  error?: string
  label?: ReactNode
  rootClassName?: string
  indicatorClassName?: string
  labelClassName?: string
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({
  checked,
  className,
  disabled,
  error,
  id,
  indicatorClassName,
  label,
  labelClassName,
  name,
  onCheckedChange,
  rootClassName,
  ...rest
}: CheckboxProps) => {
  const checkboxId = id || (name ? `checkbox-${name}` : undefined)

  const classNames = {
    checkbox: clsx(s.checkbox, disabled && s.disabled),
    checkboxContainer: clsx(s.checkboxContainer, disabled && s.disabled),
    checkboxIcon: clsx(s.checkboxIcon),
    container: clsx(s.container, className),
    error: clsx(error && s.error),
    indicator: clsx(s.indicator, indicatorClassName),
    label: clsx(s.label, disabled && s.disabled, labelClassName),
  }

  return (
    <div className={classNames.container}>
      <LabelRadix.Root className={s.root}>
        <Typography as={'label'} className={classNames.label} variant={'regularText14'}>
          <div className={classNames.checkboxContainer}>
            <CheckboxRadix.Root
              {...rest}
              checked={checked}
              className={classNames.checkbox}
              disabled={disabled}
              id={checkboxId}
              onCheckedChange={onCheckedChange}
            >
              <CheckboxRadix.Indicator className={classNames.indicator}>
                <CheckmarkOutline className={classNames.checkboxIcon} />
              </CheckboxRadix.Indicator>
            </CheckboxRadix.Root>
          </div>
          {label}
        </Typography>
      </LabelRadix.Root>
      {error && (
        <Typography className={classNames.error} variant={'regularText14'}>
          {error}
        </Typography>
      )}
    </div>
  )
}
