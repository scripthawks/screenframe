import { ComponentPropsWithoutRef } from 'react'
import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { Input, InputProps, TextField } from '@/shared'

export type ControlledInputProps<T extends FieldValues> = Omit<
  InputProps,
  'onChange' | 'onChangeValue' | 'value'
> &
  UseControllerProps<T> &
  ComponentPropsWithoutRef<typeof Input>

export const ControlledTextField = <T extends FieldValues>(props: ControlledInputProps<T>) => {
  const { control, shouldUnregister, disabled, name, ...rest } = props

  const {
    field: { ...restField },
    fieldState: { error },
  } = useController({
    control,
    disabled,
    name,
    shouldUnregister,
  })

  return <TextField {...rest} {...restField} error={error?.message} />
}
