'use client'

import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

import { Checkbox, CheckboxProps } from '@/shared'

export type ControlledCheckboxProps<T extends FieldValues> = Omit<
  CheckboxProps,
  'checked' | 'onCheckedChange'
> &
  UseControllerProps<T>

export const ControlledCheckbox = <T extends FieldValues>(props: ControlledCheckboxProps<T>) => {
  const { control, disabled, name, shouldUnregister, ...rest } = props

  const {
    field: { onChange, value, ...restField },
    fieldState: { error },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  const handleCheckedChange = (checked: boolean) => {
    onChange(checked)
  }

  return (
    <Checkbox
      {...rest}
      {...restField}
      checked={!!value}
      error={error?.message}
      id={name}
      onCheckedChange={handleCheckedChange}
    />
  )
}
