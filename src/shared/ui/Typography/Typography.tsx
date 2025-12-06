import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './Typography.module.scss'

export type TypographyProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
  variant?:
    | 'large'
    | 'small'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'regularText16'
    | 'boldText16'
    | 'regularText14'
    | 'mediumText14'
    | 'boldText14'
    | 'regularText12'
    | 'semiBoldText12'
    | 'regularLink'
    | 'smallLink'
  className?: string
} & ComponentPropsWithoutRef<T>

export const Typography = <T extends ElementType = 'p'>({
  as,
  children,
  className,
  variant = 'regularText14',
  ...rest
}: TypographyProps<T>) => {
  const Component = as || 'p'

  return (
    <Component className={clsx(styles[variant], className)} {...rest}>
      {children}
    </Component>
  )
}
