import { type ComponentPropsWithRef, useState } from 'react'

import { useMeQuery } from '@/features/auth/api'
import { baseApi } from '@/shared/api'
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
  TrendingUp,
  TrendingUpOutline,
} from '@/shared/assets/icons'
import { BASE_FRONT_URL } from '@/shared/const'
import { PrivatePages, PublicPages } from '@/shared/enums'
import { Typography } from '@/shared/ui'
import { clsx } from 'clsx'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

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
              <Typography as={Link} href="#" variant="regularText14">
                {active ? <Home /> : <HomeOutline />} Feed
              </Typography>
            </li>
            <li>
              <Typography as="button" variant="regularText14" onClick={() => setShowTooltip(true)}>
                {active ? <PlusSquare /> : <PlusSquareOutline />} Create
              </Typography>
            </li>
            <li>
              <Typography
                as={Link}
                className={actualLink(`${PrivatePages.profile}/${meData?.id}`).className}
                href={`${PrivatePages.profile}/${meData?.id}`}
                variant="regularText14"
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
              <Typography as={Link} href="#" variant="regularText14">
                {active ? <MessageCircle /> : <MessageCircleOutline />} Messenger
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="regularText14">
                {active ? <Search /> : <SearchOutline />} Search
              </Typography>
            </li>
          </div>
          <div className={classNames.secondContainer}>
            <li>
              <Typography as={Link} href="#" variant="regularText14">
                {active ? <TrendingUp /> : <TrendingUpOutline />} Statistics
              </Typography>
            </li>
            <li>
              <Typography as={Link} href="#" variant="regularText14">
                {active ? <Bookmark /> : <BookmarkOutline />} Favorites
              </Typography>
            </li>
          </div>
          <li>
            <Typography
              className={classNames.logoutText(isLoadingLogout)}
              variant="regularText14"
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
