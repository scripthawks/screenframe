'use client'

import { ReactNode, useEffect } from 'react'

import { getToken } from '@/features'
import { Loader, RoutesNames } from '@/shared'
import { useMeQuery } from '@/shared/hoc/api/authApi'
import { useAppDispatch, useAppSelector } from '@/store'
import { setGlobalAuthChecking } from '@/store/globalSlice'
import { usePathname, useRouter } from 'next/navigation'

type RoutesProviderProps = {
  children: ReactNode
}

export const RoutesProvider = ({ children }: RoutesProviderProps) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()

  const token = useAppSelector(getToken)
  const isInitialized = useAppSelector(state => state.global.isInitialized)

  const { isFetching, isLoading } = useMeQuery(undefined, {
    skip: pathname.includes(RoutesNames.SIGN_IN) || isInitialized,
  })

  useEffect(() => {
    if (!isLoading && !isFetching && !isInitialized) {
      dispatch(setGlobalAuthChecking(true))
    }
  }, [isLoading, isFetching, isInitialized, dispatch])

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    const isPublicRoute = pathname.includes(RoutesNames.SIGN_IN)

    if (!token && !isPublicRoute) {
      push(RoutesNames.SIGN_IN)
    }
  }, [token, pathname, push, isInitialized])

  if (!isInitialized) {
    return <Loader />
  }

  return <>{children}</>
}
