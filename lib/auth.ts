import { supabase } from './supabase'
import Cookies from 'js-cookie'

export const signIn = async (username: string, password: string) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .eq('password', password)
      .single()

    if (error || !data) {
      throw new Error('Invalid credentials')
    }

    // Store user session in cookies
    Cookies.set('user', JSON.stringify(data), { expires: 7 })
    
    return { user: data, error: null }
  } catch (error) {
    return { user: null, error: error instanceof Error ? error.message : 'Sign in failed' }
  }
}

export const signOut = () => {
  Cookies.remove('user')
}

export const getCurrentUser = () => {
  const userCookie = Cookies.get('user')
  if (userCookie) {
    try {
      return JSON.parse(userCookie)
    } catch {
      return null
    }
  }
  return null
}

export const isAuthenticated = () => {
  return getCurrentUser() !== null
}