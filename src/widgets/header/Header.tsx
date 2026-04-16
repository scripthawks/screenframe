'use client'

import { RoutesNames, SelectBoxDynamic, useTranslate } from '@/shared'
import { BellOutlineIcon, FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { Button, Typography } from '@/shared/ui'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import s from './Header.module.scss'

const options = [
  { id: 'en', image: <FlagUnitedKingdom />, label: 'English', value: 'en' },
  { id: 'ru', image: <FlagRussia />, label: 'Russian', value: 'ru' },
]

export const Header = ({ isAuth = false }: { isAuth?: boolean }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const { locale, t } = useTranslate()

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
        <Typography variant={'large'}>
          <Link href={'/'}>Inctagram</Link>
        </Typography>
        <div className={s.content}>
          <div className={s.options}>
            {isAuth && (
              <Button className={s.bellButton} variant={'text'}>
                <BellOutlineIcon />
                <Typography as={'span'} variant={'small'}>
                  3
                </Typography>
              </Button>
            )}

            <SelectBoxDynamic
              className={s.select}
              onChange={changeLangHandler}
              options={options}
              value={locale}
            />
          </div>
          {!isAuth && (
            <div className={s.buttonsContainer}>
              <Button
                asChild
                color={'link'}
                onClick={() => push(RoutesNames.SIGN_IN)}
                variant={'text'}
              >
                <Typography className={s.logInButtonText} variant={'h3'}>
                  {t.auth.logIn}
                </Typography>
              </Button>
              <Button
                asChild
                color={'link'}
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
