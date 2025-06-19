'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { isAuthenticated } from '@/lib/auth'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Shield } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      // Add a small delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (isAuthenticated()) {
        router.push('/dashboard')
      } else {
        router.push('/signin')
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6"
      >
        <div className="mx-auto h-20 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
          <Shield className="h-10 w-10 text-white" />
        </div>
        
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Dashboard App
          </h1>
          <p className="text-gray-600">
            Initializing your experience...
          </p>
        </div>
        
        <LoadingSpinner size="lg" />
      </motion.div>
    </div>
  )
}