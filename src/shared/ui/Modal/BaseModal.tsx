import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { Button, Typography } from '@/shared'
import { Close } from '@/shared/assets/icons'
import * as Dialog from '@radix-ui/react-dialog'
import { Separator } from '@radix-ui/react-separator'
import { clsx } from 'clsx'

import s from './BaseModal.module.scss'

export type ModalSize = 'small' | 'medium' | 'large' //small - 378px, medium - 492px, large - 644px

type BaseModalProps = {
  actionButtonName?: string
  cancelButtonName?: string
  children?: ReactNode
  className?: string
  fullWidthButton?: boolean
  modalSize?: ModalSize
  onAction?: () => void
  onCancel?: () => void
  onClose?: () => void
  open: boolean
  showSeparator?: boolean
  title?: string
} & ComponentPropsWithoutRef<'div'>

export const BaseModal = (props: BaseModalProps) => {
  const {
    actionButtonName,
    cancelButtonName,
    children,
    className,
    fullWidthButton = false,
    modalSize = 'small',
    onAction,
    onCancel,
    onClose,
    open,
    showSeparator = true,
    title,
    ...rest
  } = props

  const classNames = {
    actionButton: clsx(s.footerButton, !actionButtonName && s.actionButtonHide),
    cancelButton: clsx(s.footerButton, !cancelButtonName && s.cancelButtonHide, s.actionButton),
    content: getContentClassName(modalSize, className),
    separator: clsx(s.separator, !showSeparator && s.separatorHide),
  }

  const actionButtonHandler = () => {
    onAction?.()
  }

  const cancelButtonHandler = () => {
    onCancel?.()
  }

  function onCloseHandler() {
    onClose?.()
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={classNames.content} {...rest}>
          <div className={s.titleContainer}>
            <Dialog.Title className={s.title}>
              <Typography variant={'h1'}>{title}</Typography>
            </Dialog.Title>
            <Button className={s.closeButton} onClick={onCloseHandler}>
              <Close />
            </Button>
            <Separator className={classNames.separator} />
          </div>

          <div className={s.description}>{children}</div>

          <div className={s.footerButtons}>
            <Button
              className={classNames.cancelButton}
              onClick={cancelButtonHandler}
              variant={'outlined'}
            >
              {cancelButtonName}
            </Button>
            <Button
              className={classNames.actionButton}
              fullWidth={fullWidthButton}
              onClick={actionButtonHandler}
            >
              {actionButtonName}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

const getContentClassName = (size: ModalSize, className?: string) => {
  const sizeClassName = getSizeClassName(size)

  return clsx(className, s.content, sizeClassName)
}

const getSizeClassName = (size: ModalSize) => {
  if (size === 'small') {
    return s.small
  }
  if (size === 'medium') {
    return s.middle
  }
  if (size === 'large') {
    return s.large
  }
}
