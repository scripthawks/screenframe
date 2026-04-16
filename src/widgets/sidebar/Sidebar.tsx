import { type ComponentPropsWithRef } from 'react'

import { Logout } from '@/features'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@/shared/assets/icons'
import { RoutesNames } from '@/shared/const/routesNames'
import { useMeQuery } from '@/shared/hoc/api/authApi'
import { Typography } from '@/shared/ui'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import s from './Sidebar.module.scss'

type Props = {
  isMobile?: boolean
} & ComponentPropsWithRef<'nav'>

export const Sidebar = (props: Props) => {
  const { isMobile, ...rest } = props

  return isMobile ? <MobileSidebar {...rest} /> : <DesktopSidebar {...rest} />
}

function MobileSidebar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    mobileContainer: s.mobileContainer,
    nav: clsx(s.mobileNav, className),
  }
  const active = true

  return (
    <nav className={classNames.nav} {...rest}>
      <ul className={classNames.mobileContainer}>
        <li>
          <Link href={'#'}>{active ? <Home /> : <HomeOutline />}</Link>
        </li>
        <li>
          <Link href={'#'}>{active ? <PlusSquare /> : <PlusSquareOutline />}</Link>
        </li>
        <li>
          <Link href={'#'}>{active ? <MessageCircle /> : <MessageCircleOutline />}</Link>
        </li>
        <li>
          <Link href={'#'}>{active ? <Search /> : <SearchOutline />}</Link>
        </li>
        <li>
          <Link href={'#'}>{active ? <Person /> : <PersonOutline />}</Link>
        </li>
      </ul>
    </nav>
  )
}

function DesktopSidebar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    activeLink: s.activeLink,
    firstContainer: clsx(s.desktopContainer, s.desktopFirstContainer),
    logoutText: (isDisabled: boolean) => clsx(s.logoutText, isDisabled && s.disabled),
    nav: clsx(s.desktopNav, className),
    secondContainer: clsx(s.desktopSecondContainer, s.desktopContainer),
  }

  const pathname = usePathname()

  const { data: meData, isLoading } = useMeQuery()

  const actualLink = (actualPath: string) => ({
    active: pathname === actualPath,
    className: pathname === actualPath ? classNames.activeLink : '',
  })

  if (!meData && !isLoading) {
    return null
  }

  const active = false

  return (
    <>
      <nav className={classNames.nav} {...rest}>
        <ul>
          <div className={classNames.firstContainer}>
            <li>
              <Typography as={Link} href={'#'} variant={'regularText14'}>
                {active ? <Home /> : <HomeOutline />} Feed
              </Typography>
            </li>
            <li>
              <Typography as={'button'} variant={'regularText14'}>
                {active ? <PlusSquare /> : <PlusSquareOutline />} Create
              </Typography>
            </li>
            <li>
              <Typography
                as={Link}
                className={actualLink(`${RoutesNames.PROFILE}/${meData?.userId}`).className}
                href={`${RoutesNames.PROFILE}/${meData?.userId}`}
                variant={'regularText14'}
              >
                {actualLink(`${RoutesNames.PROFILE}/${meData?.userId}`).active ? (
                  <Person />
                ) : (
                  <PersonOutline />
                )}
                My Profile
              </Typography>
            </li>
            <li>
              <Typography as={Link} href={'#'} variant={'regularText14'}>
                {active ? <MessageCircle /> : <MessageCircleOutline />} Messenger
              </Typography>
            </li>
            <li>
              <Typography as={Link} href={'#'} variant={'regularText14'}>
                {active ? <Search /> : <SearchOutline />} Search
              </Typography>
            </li>
          </div>
          <div className={classNames.secondContainer}>
            <li>
              <Typography as={Link} href={'#'} variant={'regularText14'}>
                {active ? <TrendingUp /> : <TrendingUpOutline />} Statistics
              </Typography>
            </li>
            <li>
              <Typography>{active ? <Bookmark /> : <BookmarkOutline />} Favorites</Typography>
            </li>
          </div>
          <li>
            <Logout />
          </li>
        </ul>
      </nav>
    </>
  )
}
