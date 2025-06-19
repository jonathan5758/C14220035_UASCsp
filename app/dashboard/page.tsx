'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getCurrentUser } from '@/lib/auth'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import UserDashboard from '@/components/UserDashboard'
import AdminDashboard from '@/components/AdminDashboard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    )
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.username}! 👋
                </h1>
                <p className="text-blue-100">
                  {user?.role === 'admin' 
                    ? 'Manage your products and monitor your business performance' 
                    : 'Explore our product catalog and discover amazing deals'
                  }
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
            </motion.div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}