'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'user' | 'admin'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    
    if (!user) {
      router.push('/signin')
      return
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push('/dashboard')
      return
    }

    setIsAuthorized(true)
    setIsLoading(false)
  }, [router, requiredRole])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}