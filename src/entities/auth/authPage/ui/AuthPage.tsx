'use client'

import { ReactNode } from 'react'

import { Button, Typography } from '@/shared'
import { useRouter } from 'next/navigation'

import s from './AuthPage.module.scss'

type Props = {
  image: ReactNode
  title: string
  text: string
  nextUrl: string
  buttonName: string
  emptyUrl?: boolean
}

export const AuthPage = ({ buttonName, emptyUrl, image, nextUrl, text, title }: Props) => {
  const { push } = useRouter()

  return (
    <div className={s.container}>
      <div className={s.textContainer}>
        <div className={s.title}>
          <Typography variant={'h1'}>{title}</Typography>
        </div>
        {!emptyUrl && (
          <div className={s.text}>
            <Typography color={'primary'} variant={'regularText16'}>
              {text}
            </Typography>
          </div>
        )}
        <Button className={s.button} fullWidth onClick={() => nextUrl && push(nextUrl)}>
          <Typography variant={'h3'}>{buttonName}</Typography>
        </Button>
      </div>
      {image}
    </div>
  )
}
