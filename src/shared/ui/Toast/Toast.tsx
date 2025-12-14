import { toast, ToastOptions, ToastPosition } from 'react-toastify'

import { clsx } from 'clsx'

import 'react-toastify/dist/ReactToastify.css'

import s from './Toast.module.scss'

type ToastType = 'success' | 'error'

type ShowToastArgs = {
  type: ToastType
  text: string
  position?: ToastPosition
}

const toastOptions: ToastOptions = {
  closeButton: true,
  closeOnClick: true,
  draggable: false,
  hideProgressBar: true,
  pauseOnHover: true,
  position: 'top-center',
}

export const Toast = ({ position, text, type }: ShowToastArgs) => {
  const wrapper = clsx(s.wrapper, type === 'error' ? s.error : s.success)

  const content = (
    <div className={s.toast}>
      <div className={s.toastContent}>
        <div className={s.toastText}>
          {type === 'error' && <b>Error! </b>}
          {text}
        </div>
      </div>
    </div>
  )

  return toast(content, {
    ...toastOptions,
    className: wrapper,
    position: position,
    toastId: 'customId',
  })
}
