import React, { ComponentPropsWithoutRef, ComponentRef, forwardRef } from 'react'

import { Input } from '@/shared'

import s from './TextField.module.scss'

export type TextFieldProps = {
  className?: string
  fullWidth?: boolean
  id?: string
} & ComponentPropsWithoutRef<typeof Input>

export const TextField = forwardRef<ComponentRef<typeof Input>, TextFieldProps>(
  ({ className, fullWidth, value, ...restProps }, ref) => {
    return (
      <div className={`${className} ${fullWidth ? s.fullWidth : ''}`}>
        <Input {...restProps} ref={ref} value={value ?? ''} />
      </div>
    )
  }
)
