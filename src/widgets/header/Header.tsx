'use client'

import { RoutesNames, SelectBox, useTranslate } from '@/shared'
import { BellOutlineIcon, FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { Button, Typography } from '@/shared/ui'
import { usePathname, useRouter } from 'next/navigation'

import s from './Header.module.scss'

const options = [
  { id: 'en', value: 'en', label: 'English', image: <FlagUnitedKingdom /> },
  { id: 'ru', value: 'ru', label: 'Russian', image: <FlagRussia /> },
]

export const Header = ({ isAuth = false }: { isAuth?: boolean }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const { t, locale } = useTranslate()

  const changeLangHandler = (value: string) => {
    const segments = pathname.split('/').filter(Boolean)

    if (segments[0] === 'en' || segments[0] === 'ru') {
      segments[0] = value
    } else {
      segments.unshift(value)
    }
    push('/' + segments.join('/'))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography variant={'large'}>Inctagram</Typography>
        <div className={s.content}>
          <div className={s.options}>
            {isAuth && (
              <Button variant={'text'} className={s.bellButton}>
                <BellOutlineIcon />
                <Typography as={'span'} variant={'small'}>
                  3
                </Typography>
              </Button>
            )}

            <SelectBox
              options={options}
              className={s.select}
              value={locale}
              onChange={changeLangHandler}
            />
          </div>
          {!isAuth && (
            <div className={s.buttonsContainer}>
              <Button
                color={'link'}
                asChild
                onClick={() => push(RoutesNames.SIGN_IN)}
                variant={'text'}
              >
                <Typography className={s.logInButtonText} variant={'h3'}>
                  {t.auth.logIn}
                </Typography>
              </Button>
              <Button
                color={'link'}
                asChild
                onClick={() => push(RoutesNames.SIGN_UP)}
                variant={'primary'}
              >
                <Typography variant={'h3'}>{t.auth.signUp}</Typography>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
