'use client'

import { AuthPage } from '@/entities'
import { ResendLink } from '@/features/auth/resendLink'
import { Loader, resultCode, RoutesNames } from '@/shared'
import { LinkExpiredIcon, RegistrationConfirmationSvg } from '@/shared/assets/icons'

import { useVerifyEmail } from '../lib/useVerifyEmail'

export const VerifyEmail = () => {
  const { code, data, error, errorMessage, isAlreadyConfirmed, isError, isLoading, isSuccess, t } =
    useVerifyEmail()

  if (isLoading) {
    return <Loader />
  }

  if (isSuccess && (!data || data.resultCode === resultCode.SUCCESS)) {
    return (
      <AuthPage
        buttonName={t.auth.signIn}
        image={<RegistrationConfirmationSvg />}
        nextUrl={RoutesNames.SIGN_IN}
        text={t.auth.confirmedEmail}
        title={t.auth.congratulations}
      />
    )
  }

  if ((isError && error) || isAlreadyConfirmed) {
    // 409 or BAD_REQUEST in error.data
    if (isAlreadyConfirmed || errorMessage?.includes('already confirmed')) {
      return (
        <AuthPage
          buttonName={t.auth.signIn}
          image={<RegistrationConfirmationSvg />}
          nextUrl={RoutesNames.SIGN_IN}
          text={t.auth.alreadyConfirmedEmail}
          title={t.auth.congratulations}
        />
      )
    }

    // Code expired or Invalid token
    if (errorMessage?.includes('expired') || errorMessage?.includes('Invalid confirmation token')) {
      return <ResendLink image={<LinkExpiredIcon />} type={'email'} />
    }
  }

  if (code === null) {
    return (
      <AuthPage
        buttonName={t.auth.signIn}
        emptyUrl
        image={<RegistrationConfirmationSvg />}
        nextUrl={RoutesNames.SIGN_IN}
        text={''}
        title={t.auth.goToSignIn}
      />
    )
  }
}
