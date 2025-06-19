import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type User = {
  id: number
  username: string
  password: string
  role: 'user' | 'admin'
}

export type Product = {
  id: number
  nama_produk: string
  harga_satuan: number
  quantity: number
}