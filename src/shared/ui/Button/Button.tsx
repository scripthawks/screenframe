import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'

import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'

import s from './Button.module.scss'

export type ButtonProps = {
  asChild?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outlined' | 'text' | 'withIcon' | 'link'
  fullWidth?: boolean
  isWithIcon?: boolean
  compact?: boolean
  className?: string
} & ComponentPropsWithoutRef<'button'>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      fullWidth = false,
      isWithIcon = false,
      asChild = false,
      compact = false,
      className,
      ...rest
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'

    const classNames = { button: clsx(s.button, s[variant], fullWidth && s.fullWidth, className) }

    return <Comp ref={ref} className={classNames.button} {...rest} />
  }
)

Button.displayName = 'Button'
export { Button }
