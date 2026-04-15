'use client'

import { Button, RoutesNames, Typography, useTranslate } from '@/shared'
import { ArrowBackOutline } from '@/shared/assets/icons'
import { useRouter } from 'next/navigation'

import s from './PrivacyAndTerms.module.scss'

export const PrivacyAndTerms = ({ pageName, pageText }: { pageName: string; pageText: string }) => {
  const { push } = useRouter()
  const { t } = useTranslate()

  const blocks = pageText.split('\n')

  return (
    <div className={s.main}>
      <div className={s.backButton}>
        <Button className={s.btn} onClick={() => push(RoutesNames.SIGN_UP)} variant={'text'}>
          <div className={s.img}>
            <ArrowBackOutline className={s.logo} />
          </div>
          <Typography className={s.textReturn} variant={'regularText14'}>
            {t.auth.backToSignUp}
          </Typography>
        </Button>
      </div>
      <div className={s.titleContainer}>
        <Typography className={s.title} variant={'h1'}>
          {pageName}
        </Typography>

        <br />
        <div className={s.text}>
          {/*{pageText.split(/\n+/).map((paragraph: string, index: number) => (*/}
          {/*  <p key={index}>{paragraph}</p>*/}
          {/*))}*/}
          {blocks.map((block, i) => (
            <div key={i}>
              {block.includes('**') ? (
                <Typography
                  style={{ marginBottom: '16px', marginTop: '24px' }}
                  variant={'boldText16'}
                >
                  {block.split('**', 2)}
                </Typography>
              ) : (
                <div style={{ marginBottom: '12px' }}>{block}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
