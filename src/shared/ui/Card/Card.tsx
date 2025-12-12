import { FC, ReactNode } from 'react'

import { clsx } from 'clsx'

import styles from './Card.module.scss'

export interface CardProps {
  title?: ReactNode
  children: ReactNode
  footer?: ReactNode
  className?: string
}

export const Card: FC<CardProps> = ({ title, children, footer, className }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={clsx(styles.cardField, className)}>
        {title && <div className={styles.cardHeader}>{title}</div>}
        <div className={styles.cardContent}>{children}</div>
        {footer && <div className={styles.cardFooter}>{footer}</div>}
      </div>
    </div>
  )
}

Card.displayName = 'Card'
