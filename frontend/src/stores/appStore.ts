import type { ICustomer } from '@/interfaces/atoms/ICustomer'
import type { IInvoice } from '@/interfaces/atoms/IInvoice' // Adjust the import path as needed
import type { IProduct } from '@/interfaces/atoms/IProduct'
import { AppModule, EntityStatus } from '@/interfaces/enums'
import { defineStore } from 'pinia'
import { useCustomerStore } from './customerStore'
import { useInvoiceStore } from './invoiceStore'
import { useProductStore } from './productsStore'
export const useAppStore = defineStore('app', {
  state: () => ({
    invoices: [] as IInvoice[],
    products: [] as IProduct[],
    customers: [] as ICustomer[],
    isLoading: false,
    error: null as string | null
  }),

  actions: {
    async onInit() {
      // const productStore = useProductStore()
      // const customerStore = useCustomerStore()
      // const invoiceStore = useInvoiceStore()
      // console.log('appstore')
      // if (this.products.length + this.invoices.length + this.customers.length == 0) {
      //   console.log('appstore empty')

      //   const responseProducts = await productStore.fetchAllProducts()
      //   const responseInvoices = await invoiceStore.fetchAllInvoices()
      //   const responseCustomers = await customerStore.fetchAllCustomers()

      //   if (responseCustomers?.length < 1) {
      //     console.log('customers empty')

      //     this.customers = await this.initCustomerTable()
      //     console.log('onInit AppStore', this.customers)
      //   }
      //   if (responseProducts?.length < 1) {
      //     this.products = await this.initProductTable()
      //     console.log('onInit AppStore', this.products)
      //   }
      //   if (responseInvoices?.length < 1 && this.customers[0]._id != undefined) {
      //     this.invoices = await this.initInvoiceTable(this.customers[0]._id)
      //     console.log('onInit AppStore', this.invoices)
      //   }
      // }
      // console.log('init over')
    },

    async initCustomerTable(): Promise<ICustomer[]> {
      const customerStore = useCustomerStore()
      const sampleCustomer = {
        name: 'sampleCustomer',
        entityKey: AppModule.Customer,
        status: EntityStatus.Created
      } as ICustomer
      await customerStore.createCustomer(sampleCustomer)
      const response = await customerStore.fetchAllCustomers()
      console.log('Created in appStore')
      return response
    },
    async initProductTable(): Promise<IProduct[]> {
      const productStore = useProductStore()
      const sampleProduct = {
        name: 'sampleProduct',
        unitPrice: 0,
        entityKey: AppModule.Product,
        status: EntityStatus.Created
      } as IProduct
      const response = await productStore.createProduct(sampleProduct)
      console.log('Created in appStore')
      return response ?? []
    },

    async initInvoiceTable(id: string): Promise<IInvoice[]> {
      const invoiceStore = useInvoiceStore()
      const sampleInvoice = {
        name: 'sampleInvoice',
        number: 1001,
        customer: id,
        date: new Date('2024-03-13'),
        invoiceTotal: 150.75,
        status: EntityStatus.Created,
        entityKey: AppModule.Order
      } as IInvoice
      const response = await invoiceStore.createInvoice(sampleInvoice)
      console.log('Created in appStore')
      return response ?? []
    }
  }
})
