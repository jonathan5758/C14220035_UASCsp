'use client'

import { useEffect, useState } from 'react'
import { getCurrentUser } from '@/lib/auth'
import ProtectedRoute from '@/components/ProtectedRoute'
import Navbar from '@/components/Navbar'
import UserDashboard from '@/components/UserDashboard'
import AdminDashboard from '@/components/AdminDashboard'

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {user?.username}!
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                {user?.role === 'admin' 
                  ? 'Manage products and view analytics' 
                  : 'View available products'
                }
              </p>
            </div>

            {user?.role === 'admin' ? <AdminDashboard /> : <UserDashboard />}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}