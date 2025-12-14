import { type ComponentPropsWithRef, useState } from 'react'

import { SimpleYesNoDialog } from '@/entities/SimpleYesNoDialog'
import { Tooltip } from '@/entities/Tooltip/Tooltip'
import { useMeQuery } from '@/features/auth/api'
import { useLogoutMutation } from '@/features/auth/api/auth.service'
import {
  Bookmark,
  BookmarkOutline,
  Home,
  HomeOutline,
  LogOut,
  LogOutOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
  TrendUp,
  TrendUpOutline,
} from '@shared/assets/icons'
import { TOKEN } from '@/shared/constants'
import { PrivatePages, PublicPages } from '@/shared/enums'
import { baseApi } from '@/shared/store'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import s from './Sidebar.module.scss'

import { Typography } from '@shared/ui/Typography'

type Props = {
  isMobile?: boolean
} & ComponentPropsWithRef<'nav'>

export const Sidebar = (props: Props) => {
  const { isMobile, ...rest } = props

  return isMobile ? <MobileSidebar {...rest} /> : <DesktopSidebar {...rest} />
}

function MobileSidebar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    nav: clsx(s.mobileNav, className),
    mobileContainer: s.mobileContainer,
  }
  const active = true
  return (
    <nav className={classNames.nav} {...rest}>
      <ul className={classNames.mobileContainer}>
        <li>
          <Link href="#">{active ? <Home /> : <HomeOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <PlusSquare /> : <PlusSquareOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <MessageCircle /> : <MessageCircleOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <Search /> : <SearchOutline />}</Link>
        </li>
        <li>
          <Link href="#">{active ? <Person /> : <PersonOutline />}</Link>
        </li>
      </ul>
    </nav>
  )
}

function DesktopSidebar({ className, ...rest }: ComponentPropsWithRef<'nav'>) {
  const classNames = {
    nav: clsx(s.desktopNav, className),
    firstContainer: clsx(s.desktopContainer, s.desktopFirstContainer),
    secondContainer: clsx(s.desktopSecondContainer, s.desktopContainer),
    activeLink: s.activeLink,
    logoutText: (isDisabled: boolean) => clsx(s.logoutText, isDisabled && s.disabled),
  }

  const router = useRouter()
  const pathname = usePathname()

  const { data: meData } = useMeQuery()
  const [logoutMutation, { isLoading: isLoadingLogout }] = useLogoutMutation()
  const [isLogoutOpen, setIsLogoutOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const handleConfirmLogout = async () => {
    try {
      await logoutMutation().unwrap()
      localStorage.removeItem(TOKEN)
      baseApi.util.resetApiState()
      setIsLogoutOpen(false)
      router.push(PublicPages.signIn)
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

  const actualLink = (actualPath: string) => ({
    active: pathname === actualPath,
    className: pathname === actualPath ? classNames.activeLink : '',
  })

  const active = false

  return (
    <>
      <nav className={classNames.nav} {...rest}>
        <ul>
          <div className={classNames.firstContainer}>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Home /> : <HomeOutline />} Feed
              </Typography>
            </li>
            <li>
              <Typography as="button" variant="medium_14" onClick={() => setShowTooltip(true)}>
                {active ? <PlusSquare /> : <PlusSquareOutline />} Create
              </Typography>
            </li>
            <li>
              <Typography
                as={Link}
                className={actualLink(`${PrivatePages.profile}/${meData?.id}`).className}
                href={`${PrivatePages.profile}/${meData?.id}`}
                variant="medium_14"
              >
                {actualLink(`${PrivatePages.profile}/${meData?.id}`).active ? (
                  <Person />
                ) : (
                  <PersonOutline />
                )}{' '}
                My Profile
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <MessageCircle /> : <MessageCircleOutline />} Messenger
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Search /> : <SearchOutline />} Search
              </Typography>
            </li>
          </div>
          <div className={classNames.secondContainer}>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <TrendUp /> : <TrendUpOutline />} Statistics
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="medium_14">
                {active ? <Bookmark /> : <BookmarkOutline />} Favorites
              </Typography>
            </li>
          </div>
          <li>
            <Typography
              className={classNames.logoutText(isLoadingLogout)}
              variant="medium_14"
              onClick={() => setIsLogoutOpen(true)}
            >
              {active ? <LogOut /> : <LogOutOutline />} Log Out
            </Typography>
          </li>
        </ul>
      </nav>
    </>
  )
}
