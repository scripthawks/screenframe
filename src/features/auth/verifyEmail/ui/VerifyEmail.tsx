import { AuthPage } from '@/entities'
import { RoutesNames, useTranslate } from '@/shared'
import { RegistrationConfirmationSvg } from '@/shared/assets/icons'

export const VerifyEmail = () => {
  const { t } = useTranslate()

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
