import { Loader, Modal, Typography } from '@/shared'

import { useSignUp } from '../lib/useSignUp'
import { SingUpForm } from './signUpForm/SignUpForm'

export const SignUp = () => {
  const { email, emailSentModal, isLoading, onModalClose, onSaveModalAction, submit, t } =
    useSignUp()

  if (isLoading) {
    return <Loader />
  }

  return (
    <div>
      <SingUpForm onSubmitHandlerAction={submit} />
      <Modal
        actionButtonName={t.auth.ok}
        modalSize={'large'}
        onAction={onSaveModalAction}
        onClose={onModalClose}
        open={emailSentModal}
        title={t.auth.emailSent}
      >
        <Typography variant={'regularText16'}>
          {t.auth.emailConfirm(email ? email : '...')}
        </Typography>
      </Modal>
    </div>
  )
}
