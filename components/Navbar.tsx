'use client'

import { useRouter } from 'next/navigation'
import { getCurrentUser, signOut } from '@/lib/auth'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const handleSignOut = () => {
    signOut()
    router.push('/signin')
  }

  if (!user) return null

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Welcome, <span className="font-semibold">{user.username}</span>
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {user.role}
            </span>
            <button
              onClick={handleSignOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}