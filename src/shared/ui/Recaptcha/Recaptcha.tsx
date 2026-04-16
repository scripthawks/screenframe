'use client'

import { useEffect, useState } from 'react'

import { CaptchaSpinner, Checkbox } from '@/shared'
import { CheckmarkRecaptcha, RecaptchaLogo1 } from '@/shared/assets/icons'
import * as LabelRadix from '@radix-ui/react-label'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './Recaptcha.module.scss'

export type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'
export type RecaptchaProps = {
  label?: string
  className?: string
  id?: string
  isStatus?: RecaptchaStatus
  onVerify?: () => void
  onReset?: () => void
  error?: string | undefined
}
export const Recaptcha = (props: RecaptchaProps) => {
  const { className, error, isStatus = 'idle', onReset, onVerify } = props

  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked)
    if (checked && onVerify) {
      onVerify()
    }
    if (!checked && onReset) {
      onReset()
    }
  }
  const classNames = {
    checkbox: clsx(s.checkbox),
    container: clsx(s.container, className, {
      [s.error]: isStatus === 'error',
      [s.expired]: isStatus === 'expired',
      [s.notVerified]: isStatus === 'notVerified',
      [s.pending]: isStatus === 'pending',
      [s.verified]: isStatus === 'verified',
    }),
    cornerLabel: clsx(s.cornerLabel),
    errorContainer: clsx(s.errorContainer, {
      [s.errorAboce]: isStatus === 'expired',
      [s.errorInsibe]: isStatus === 'verified',
    }),
    errorMessage: clsx(s.errorMessage),
    label: clsx(s.label),
    wrapper: clsx(s.wrapper, {
      [s.wrapperError]: isStatus === 'expired' || isStatus === 'notVerified',
    }),
  }

  const handleClick = () => {
    if (
      (isStatus === 'idle' ||
        isStatus === 'error' ||
        isStatus === 'expired' ||
        isStatus === 'notVerified') &&
      onVerify
    ) {
      onVerify()
    }
  }
  const getErrorMessage = () => {
    switch (isStatus) {
      case 'expired':
        return 'Verification expired. Check the checkbox again.'
      case 'notVerified':
        return 'Please verify that you are not a robot'
      default:
        return null
    }
  }
  const renderCheckboxContent = () => {
    switch (isStatus) {
      case 'pending':
        return (
          <div className={s.loaderContainer}>
            <CaptchaSpinner />
            <LabelRadix.Root className={classNames.label}>I&#39;m not a robot</LabelRadix.Root>
          </div>
        )
      case 'verified':
        return (
          <>
            <CheckmarkRecaptcha className={s.check} />
            <LabelRadix.Root className={classNames.label}>I&#39;m not a robot</LabelRadix.Root>
          </>
        )
      default:
        return (
          <Checkbox
            checked={checked}
            className={s.checkbox}
            label={"I'm not a robot"}
            labelClassName={s.labelchekbox}
            onCheckedChange={handleCheckboxChange}
            rootClassName={s.rootChekbox}
          />
        )
    }
  }

  useEffect(() => {
    if (isStatus === 'error' || isStatus === 'expired' || isStatus === 'notVerified') {
      setChecked(false)
    }
  }, [isStatus])

  return (
    <div className={classNames.wrapper}>
      <div className={classNames.container} onClick={handleClick}>
        {isStatus === 'expired' && (
          <div className={classNames.errorContainer}>
            <div className={classNames.errorMessage}>{getErrorMessage()}</div>
          </div>
        )}
        <div className={s.checkboxWrapper}>{renderCheckboxContent()}</div>
        <div className={s.privacy}>
          <RecaptchaLogo1 className={s.icon} />
          <label className={s.recaptcha}>reCAPTCHA</label>
          <div className={s.link}>
            <Link href={'/'}>Privacy</Link>
            <span>-</span>
            <Link href={'/'}>Terms</Link>
          </div>
        </div>
      </div>

      {(isStatus === 'error' || isStatus === 'notVerified') && (
        <div className={classNames.errorContainer}>
          <div className={classNames.errorMessage}>{error || getErrorMessage()}</div>
        </div>
      )}
    </div>
  )
}
