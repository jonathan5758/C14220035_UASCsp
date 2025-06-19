'use client'

import { useEffect, useState } from 'react'
import { supabase, Product } from '@/lib/supabase'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga_satuan: '',
    quantity: ''
  })

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true })

      if (error) throw error
      setProducts(data || [])
    } catch (error) {
      toast.error('Failed to fetch products')
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingProduct(null)
    setFormData({ nama_produk: '', harga_satuan: '', quantity: '' })
    setShowModal(true)
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setFormData({
      nama_produk: product.nama_produk,
      harga_satuan: product.harga_satuan.toString(),
      quantity: product.quantity.toString()
    })
    setShowModal(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      toast.success('Product deleted successfully')
      fetchProducts()
    } catch (error) {
      toast.error('Failed to delete product')
      console.error('Error:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.nama_produk.trim() || !formData.harga_satuan || !formData.quantity) {
      toast.error('Please fill in all fields')
      return
    }

    const productData = {
      nama_produk: formData.nama_produk.trim(),
      harga_satuan: parseInt(formData.harga_satuan),
      quantity: parseInt(formData.quantity)
    }

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', editingProduct.id)

        if (error) throw error
        toast.success('Product updated successfully')
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData])

        if (error) throw error
        toast.success('Product created successfully')
      }

      setShowModal(false)
      fetchProducts()
    } catch (error) {
      toast.error(editingProduct ? 'Failed to update product' : 'Failed to create product')
      console.error('Error:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(amount)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Product Management
          </h3>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Add Product
          </button>
        </div>
        
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {product.nama_produk}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatCurrency(product.harga_satuan)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(product)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No products available</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.nama_produk}
                    onChange={(e) => setFormData({ ...formData, nama_produk: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Unit Price (IDR)
                  </label>
                  <input
                    type="number"
                    value={formData.harga_satuan}
                    onChange={(e) => setFormData({ ...formData, harga_satuan: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                    min="0"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    {editingProduct ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}