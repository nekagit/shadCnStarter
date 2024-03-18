import type { ICustomer } from '@/interfaces/atoms/ICustomer' // Adjust the import path as needed
import axios from 'axios'

const API_URL = 'http://localhost:8080/api/customers' // Adjust the URL as needed

const CustomerService = {
  async createCustomer(newCustomer: ICustomer): Promise<ICustomer> {
    try {
      const response = await axios.post(API_URL, newCustomer)
      console.log("response",response)
      return response.data
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to create customer')
    }
  },

  async getAllCustomers(): Promise<ICustomer[]> {
    try {
      const response = (await axios.get(API_URL)).data
      console.log(response, 'hehe')
      return response
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to fetch customers')
    }
  },

  async getCustomerById(id: string): Promise<ICustomer> {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      return response.data
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to fetch customer')
    }
  },

  async updateCustomerById(id: string, updatedCustomerData: Partial<ICustomer>): Promise<void> {
    try {
      await axios.put(`${API_URL}/${id}`, updatedCustomerData)
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to update customer')
    }
  },

  async deleteCustomerById(id: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/${id}`)
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to delete customer')
    }
  },

  async deleteAllCustomers(): Promise<void> {
    try {
      await axios.delete(API_URL)
    } catch (error: any) {
      throw new Error(error.response.data.message || 'Failed to delete all customers')
    }
  }
}

export default CustomerService
