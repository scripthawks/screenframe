import { useEffect, useState } from 'react'

import { Checkbox, CaptchaSpinner } from '@/shared/ui'
import { clsx } from 'clsx'
import Link from 'next/link'

import s from './Recaptcha..module.scss'

import { CheckmarkRecaptcha, RecaptchaLogo1 } from '../../assets/icons'

export type RecaptchaStatus = 'idle' | 'pending' | 'verified' | 'error' | 'expired' | 'notVerified'
type RecaptchaProps = {
  label?: string
  className?: string
  id?: string
  isStatus?: RecaptchaStatus
  onVerify?: () => void
}
export const Recaptcha = ({ className, isStatus = 'idle', onVerify }: RecaptchaProps) => {
  const [checked, setChecked] = useState<boolean | 'indeterminate'>(false)
  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked === true)
    if (checked === true && onVerify) {
      onVerify()
    }
  }
  const classNames = {
    wrapper: clsx(s.wrapper, {
      [s.wrapperError]: isStatus === 'expired' || isStatus === 'notVerified',
    }),
    container: clsx(s.container, className, {
      [s.verified]: isStatus === 'verified',
      [s.error]: isStatus === 'error',
      [s.expired]: isStatus === 'expired',
      [s.notVerified]: isStatus === 'notVerified',
      [s.pending]: isStatus === 'pending',
    }),
    checkbox: clsx(s.checkbox),
    label: clsx(s.label),
    errorContainer: clsx(s.errorContainer, {
      [s.errorInsibe]: isStatus === 'verified',
      [s.errorAboce]: isStatus === 'expired',
    }),
    errorMessage: clsx(s.errorMessage),
    cornerLabel: clsx(s.cornerLabel),
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
            <span className={classNames.label}>I'm not a robot</span>
          </div>
        )
      case 'verified':
        return (
          <>
            <CheckmarkRecaptcha className={s.check} />
            <span className={classNames.label}>I'm not a robot</span>
          </>
        )
      default:
        return (
          <Checkbox
            checked={checked}
            className={s.checkbox}
            label={"I'm not a robot"}
            labelClassName={s.labelchekbox}
            rootClassName={s.rootChekbox}
            onCheckedChange={handleCheckboxChange}
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
          <div className={classNames.errorMessage}>{getErrorMessage()}</div>
        </div>
      )}
    </div>
  )
}
