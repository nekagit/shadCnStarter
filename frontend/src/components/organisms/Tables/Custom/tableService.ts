import type { ICustomer } from '@/interfaces/atoms/ICustomer'
import type { IInvoice } from '@/interfaces/atoms/IInvoice'
import type { IProduct } from '@/interfaces/atoms/IProduct'
import { AppModule, EntityStatus } from '@/interfaces/enums'
import type { ColumnDef } from '@tanstack/vue-table'
import { ref, type Ref } from 'vue'

export const invoiceColumns: ColumnDef<IInvoice>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original._id
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'number',
    header: 'Number',
    cell: ({ row }) => row.original.number
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status
  },
  {
    accessorKey: 'entityKey',
    header: 'Type',
    cell: ({ row }) => row.original.entityKey
  },
  {
    accessorKey: 'customer',
    header: 'Customer',
    cell: ({ row }) => row.original.customer
  },
  {
    accessorKey: 'date',
    header: 'Creation',
    cell: ({ row }) => row.original.date
  },
  {
    accessorKey: 'invoiceTotal',
    header: 'Total',
    cell: ({ row }) => row.original.invoiceTotal
  }
]

// Define columns for products
export const productColumns: ColumnDef<IProduct>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original._id
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'unitPrice',
    header: 'Unit Price',
    cell: ({ row }) => row.original.unitPrice
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status
  },
  {
    accessorKey: 'entityKey',
    header: 'Type',
    cell: ({ row }) => row.original.entityKey
  }
]

// Define columns for customers
export const customerColumns: ColumnDef<ICustomer>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => row.original._id
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => row.original.name
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => row.original.status
  },
  {
    accessorKey: 'entityKey',
    header: 'Type',
    cell: ({ row }) => row.original.entityKey
  }
]

// Define initial values for products and customers
export const productItem: Ref<IProduct> = ref({
  name: '',
  unitPrice: 0,
  entityKey: AppModule.Product,
  status: EntityStatus.Created
})
export const invoiceItem: Ref<IInvoice> = ref({
  name: '',
  customer: '',
  date: undefined,
  invoiceTotal: 0,
  number: 0,
  entityKey: AppModule.Order,
  status: EntityStatus.None
})
export const customerItem: Ref<ICustomer> = ref({
  name: '',
  entityKey: AppModule.Customer,
  status: EntityStatus.Created
})
// Define classes for each type
class Invoice implements IInvoice {
  // Define properties and methods for the Invoice class
}

class Product implements IProduct {
  // Define properties and methods for the Product class
}

class Customer implements ICustomer {
  // Define properties and methods for the Customer class
}
// Define instance of functions for checking types
export function instanceOfIInvoice(object: any): object is IInvoice {
  return object instanceof Invoice;
}

export function instanceOfIProduct(object: any): object is IProduct {
  return object instanceof Product;
}

export function instanceOfICustomer(object: any): object is ICustomer {
  return object instanceof Customer;
}