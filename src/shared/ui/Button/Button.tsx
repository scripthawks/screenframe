import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import {clsx} from 'clsx'
import style from './Button.module.scss'

export type ButtonProps = {
  asChild?: boolean
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'withIcon' | 'link'
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

    return (
      <Comp
        ref={ref}
        className={clsx(style.button, style[variant], fullWidth && style.fullWidth, className)}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'
export { Button }
