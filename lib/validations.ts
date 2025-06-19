import { z } from 'zod'

export const signInSchema = z.object({
  username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
})

export const productSchema = z.object({
  nama_produk: z.string().min(1, 'Product name is required').min(2, 'Product name must be at least 2 characters'),
  harga_satuan: z.number().min(1, 'Price must be greater than 0'),
  quantity: z.number().min(0, 'Quantity cannot be negative'),
})

export type SignInFormData = z.infer<typeof signInSchema>
export type ProductFormData = z.infer<typeof productSchema>