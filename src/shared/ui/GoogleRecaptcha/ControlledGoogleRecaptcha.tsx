'use client'

import { FieldValues, useController, UseControllerProps } from 'react-hook-form'

import { GoogleRecaptcha } from './GoogleRecaptcha'

type ControlledGoogleRecaptchaProps<T extends FieldValues> = UseControllerProps<T> & {
  className?: string
}

export const ControlledGoogleRecaptcha = <T extends FieldValues>({
  className,
  control,
  name,
  ...props
}: ControlledGoogleRecaptchaProps<T>) => {
  const { field } = useController({ control, name, ...props })

  return <GoogleRecaptcha className={className} onVerify={token => field.onChange(token)} />
}
