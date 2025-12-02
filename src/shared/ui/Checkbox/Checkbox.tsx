import { type ComponentPropsWithRef, type ReactNode, useId } from 'react'

import * as CheckboxRadix from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './Checkbox.module.scss'

import Vector from '../../assets/icons/CheckmarkOutline'

export type CheckboxProps = {
  label?: ReactNode
  rootClassName?: string
  indicatorClassName?: string
  labelClassName?: string
} & ComponentPropsWithRef<typeof CheckboxRadix.Root>

export const Checkbox = ({
  disabled,
  id,
  label,
  className,
  checked,
  onCheckedChange,
  indicatorClassName,
  rootClassName,
  labelClassName,
  ...rest
}: CheckboxProps) => {
  const generatedId = useId()
  const checkboxId = id ?? generatedId

  const classNames = {
    container: clsx(s.container, className),
    root: clsx(s.root, disabled && s.disabled, rootClassName),
    indictor: clsx(s.indicator, indicatorClassName),
    label: clsx(s.label, disabled && s.disabled, labelClassName),
  }

  return (
    <div className={classNames.container}>
      <CheckboxRadix.Root
        {...rest}
        checked={checked}
        className={classNames.root}
        disabled={disabled}
        id={checkboxId}
        onCheckedChange={onCheckedChange}
      >
        <CheckboxRadix.Indicator>
          <Vector />
        </CheckboxRadix.Indicator>
      </CheckboxRadix.Root>
      {label && (
        <label className={classNames.label} htmlFor={checkboxId}>
          {label}
        </label>
      )}
    </div>
  )
}
