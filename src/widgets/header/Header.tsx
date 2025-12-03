'use client'
import React, { useState } from 'react'
import { BellOutlineIcon, FlagRussia, FlagUnitedKingdom } from '@/shared/assets/icons'
import { Button, SelectBox, Typography } from '@/shared/ui'
import Link from 'next/link'

import s from './Header.module.scss'

const options = [
  { value: 'Russian', icon: <FlagRussia /> },
  { value: 'UK', icon: <FlagUnitedKingdom /> },
]

export const Header = ({ is_auth = false }: { is_auth?: boolean }) => {
  const [lang, setLang] = useState(options[0].value)

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <Typography variant={'large'}>Inctagram</Typography>
        <div className={s.content}>
          {is_auth && (
            <Button variant={'withIcon'} className={s.bellButton}>
              <BellOutlineIcon />
              <Typography as={'span'} variant={'small'}>
                3
              </Typography>
            </Button>
          )}

          <SelectBox
            options={options}
            className={s.select}
            value={lang}
            onChange={value => setLang(value)}
          />

          {!is_auth && (
            <div className={s.buttonsContainer}>
              <Button variant={'text'}>Log in</Button>
              <Button asChild>
                <Link href={'/sign-up'}>Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
