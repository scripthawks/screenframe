import { useState } from 'react'

import { Button, Modal, Typography } from '@/shared/ui'

import s from './EmailSentModal.module.scss'

type Props = {
  email: string
  onClose: () => void
}

export const EmailSentModal = ({ email, onClose }: Props) => {
  const [openModal, setOpenModal] = useState(true)

  const modalOpenHandler = () => {
    setOpenModal(false)
    onClose()
  }

  return (
    <Modal
      className={'modal-header-override'}
      onChange={modalOpenHandler}
      open={openModal}
      title={'Email sent'}
    >
      <div className={s.container}>
        <Typography variant={'regularText16'}>
          We have sent a link to confirm your {email}
        </Typography>
        <Button className={s.button} onClick={modalOpenHandler}>
          OK
        </Button>
      </div>
    </Modal>
  )
}
