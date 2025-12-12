'use client'
import {
  useState,
  forwardRef,
  useId,
  KeyboardEvent,
  type InputHTMLAttributes,
  type ReactNode,
  ChangeEvent,
} from 'react'

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
  onChangeValue?: (value: string) => void
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
    onChange,
    onChangeValue,
    onEnter,
    onKeyDown,
    disabled,
    value,
    ...rest
  } = props

  const generatedId = useId()
  const inputId = rest.id ?? generatedId

  const [showPassword, setShowPassword] = useState(false)

  const isPassword = variant === 'password'
  const isSearch = variant === 'search'
  // eslint-disable-next-line no-nested-ternary
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeValue?.(e.target.value)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          value={value}
          {...rest}
        />

        {isPassword ? (
          <>
            {showPassword ? (
              <EyeOffOutline
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                className={clsx(s.inputIcon, s.endIcon)}
                onClick={handleTogglePassword}
              />
            ) : (
              <EyeOutline
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                className={clsx(s.inputIcon, s.endIcon)}
                onClick={handleTogglePassword}
              />
            )}
          </>
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
