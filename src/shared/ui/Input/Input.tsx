'use client'
import React, { useState, forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

import { EyeOffOutline, EyeOutline, Search } from '@/shared/assets/icons'
import { Typography } from '@/shared/ui'
import { clsx } from 'clsx'

import s from './Input.module.scss'

type Variant = 'text' | 'password' | 'email' | 'search'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string
  error?: string
  variant?: Variant
  startIcon?: ReactNode
  endIcon?: ReactNode
  onEnter?: () => void
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    error,
    className,
    startIcon,
    endIcon,
    variant = 'text',
    onEnter,
    onKeyDown,
    disabled,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = rest.id ?? generatedId

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = variant === 'password'
  const isSearch = variant === 'search'
  const htmlType = isPassword ? (showPassword ? 'text' : 'password') : variant

  const wrapperClasses = clsx(s.inputWrapper, {
    [s.error]: !!error,
    [s.inputDisabled]: disabled,
  })

  const inputClasses = clsx(
    s.inputField,
    {
      [s.withStartIcon]: Boolean(startIcon) || isSearch,
      [s.withEndIcon]: Boolean(endIcon) || isPassword,
      [s.inputError]: !!error,
      [s.inputDisabled]: disabled,
    },
    className
  )

  const handleTogglePassword = () => setShowPassword(prev => !prev)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter?.()
    }
    onKeyDown?.(e)
  }

  return (
    <div className={wrapperClasses}>
      {label && (
        <Typography
          as={'label'}
          htmlFor={inputId}
          variant={'regularText14'}
          className={s.inputLabel}
        >
          {label}
        </Typography>
      )}

      <div className={s.inputInnerWrapper}>
        {isSearch && (
          <div className={clsx(s.inputIcon, s.startIcon)}>{startIcon ?? <Search />}</div>
        )}

        <input
          id={inputId}
          ref={ref}
          type={htmlType}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          onKeyDown={handleKeyDown}
          {...rest}
        />

        {isPassword ? (
          <button
            type={'button'}
            aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
            disabled={disabled}
            className={clsx(s.inputIcon, s.endIcon)}
            onClick={handleTogglePassword}
          >
            {showPassword ? <EyeOffOutline /> : <EyeOutline />}
          </button>
        ) : (
          endIcon && <div className={clsx(s.inputIcon, s.endIcon)}>{endIcon}</div>
        )}
      </div>

      {error && (
        <Typography
          as={'span'}
          id={`${inputId}-error`}
          role={'alert'}
          variant={'regularText14'}
          className={s.inputErrorMessage}
        >
          {error}
        </Typography>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export { Input }
