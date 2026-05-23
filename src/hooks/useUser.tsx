import { useEffect } from 'react'
import { useAuth } from '@workos-inc/authkit-react'
import { useLocation, useNavigate } from '@tanstack/react-router'

type UserOrNull = ReturnType<typeof useAuth>['user']

export const useUser = (): UserOrNull => {
  const { user, isLoading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !user) {
      navigate({ to: '/auth', search: { returnTo: location.pathname } })
    }
  }, [isLoading, user])

  return user
}
