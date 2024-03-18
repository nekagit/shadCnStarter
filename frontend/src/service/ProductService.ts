import type { IProduct } from '@/interfaces/atoms/IProduct'
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/products'

const ProductService = {
  async createProduct(newProduct: IProduct): Promise<IProduct> {
    try {
      const response = await axios.post(API_URL, newProduct)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to create product')
    }
  },

  async getAllProducts(): Promise<IProduct[]> {
    try {
      const response = await axios.get(API_URL)
      console.log(response,"hehe")
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch products')
    }
  },

  async getProductById(id: string): Promise<IProduct> {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch product')
    }
  },

  async updateProductById(id: string, updatedProductData: Partial<IProduct>): Promise<void> {
    try {
      await axios.put(`${API_URL}/${id}`, updatedProductData)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to update product')
    }
  },

  async deleteProductById(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete product')
    }
  },

  async deleteAllProducts(): Promise<void> {
    try {
      await axios.delete(API_URL)
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to delete all products')
    }
  }
}

export default ProductService
