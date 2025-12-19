
export interface Product {
  id: number
  title: string
  description: string
  price: number
  stock: number
  brand: string
  category: string
  images: string[]
}
export interface ApiResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

const baseUrl = 'https://dummyjson.com/products';

export const ProductService= {

  // Obtener todos los productos
  async getAllProducts(limit: number = 30, skip: number = 0): Promise<Product[]> {
    try {
      const response = await fetch(`${baseUrl}?limit=${limit}&skip=${skip}`)
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
      
      const data: ApiResponse = await response.json()
      return data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  // Buscar productos por término de búsqueda
  async searchProducts(searchTerm: string, limit: number = 30): Promise<Product[]> {
    try {
      if (!searchTerm.trim()) {
        return this.getAllProducts(limit)
      }

      const response = await fetch(`${baseUrl}/search?q=${encodeURIComponent(searchTerm)}&limit=${limit}`)
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`)
      
      const data: ApiResponse = await response.json()
      return data.products
    } catch (error) {
      console.error('Error searching products:', error)
      throw error
    }
  }
 
}
