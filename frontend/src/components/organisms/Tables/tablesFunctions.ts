import type { AppModule } from '@/interfaces/enums'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'

import { Checkbox } from '@/components/ui/checkbox'
export interface IBaseColumn {
  _id?: string
  name: string
  entityKey: AppModule
  status: string
}

export interface IForm {
  _id?: string
  name?: string
  entityKey?: AppModule
  status?: string
  invoice?: string
  product?: string
  unitPrice?: number
  quantity?: number
  lineTotal?: number
  number?: number
  customer?: string | undefined
  date?: Date
  invoiceTotal?: number
}

export interface DataTableProps {
  data: IBaseColumn[]
}
export const baseColumns: ColumnDef<IBaseColumn>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) => {
      return h(Checkbox, {
        checked: row.getIsSelected(),
        'onUpdate:checked': (value) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      })
    },
    enableSorting: false,
    enableHiding: false
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
