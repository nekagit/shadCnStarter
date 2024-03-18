<script setup lang="ts">
import CreateDialog from '@/components/organisms/Dialgos/CreateDialog.vue'
import DataTablePagination from '@/components/organisms/Tables/DataTablePagination.vue'
import DataTableToolbar from '@/components/organisms/Tables/DataTableToolbar.vue'
import { AppModule, EntityStatus } from '@/interfaces/enums'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/lib/registry/new-york/ui/table'
import { valueUpdater } from '@/lib/utils'
import { useAppStore } from '@/stores/appStore'
import { useCustomerStore } from '@/stores/customerStore'
import { useInvoiceStore } from '@/stores/invoiceStore'
import { useProductStore } from '@/stores/productsStore'
import type { ColumnFiltersState, SortingState, VisibilityState } from '@tanstack/vue-table'
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { onBeforeMount, ref } from 'vue'
import { instanceOfICustomer, instanceOfIProduct, invoiceColumns } from './tableService'

// Define props
const props = defineProps<{
  item: any
}>()
const localItems = ref([] as any[])

onBeforeMount(async () => {
  await useAppStore().onInit()
  if (Object.keys(props.item).find((x) => x == 'customer')) {
    console.log(localItems.value, 'invocie')
    localItems.value = useAppStore().invoices
  } else if (instanceOfIProduct(props.item)) {
    console.log(localItems.value, 'prodcuts')
    localItems.value = useAppStore().products
  } else if (instanceOfICustomer(props.item)) {
    console.log(localItems.value, 'customtable')
    localItems.value = useAppStore().customers
  }
})

const sorting = ref<SortingState>([])
const columnFilters = ref<ColumnFiltersState>([])
const columnVisibility = ref<VisibilityState>({})
const rowSelection = ref({})

const table = useVueTable({
  get data() {
    return localItems.value
  },
  get columns() {
    return invoiceColumns
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return rowSelection.value
    }
  },
  enableRowSelection: true,
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues()
})
async function handleOnChange(values: any) {
  if (Object.keys(props.item).find((x) => x == 'customer')) {
    console.log('onchange')
    localItems.value =
      (await useInvoiceStore().createInvoice({
        name: values.name,
        number: values.number,
        status: EntityStatus.Created,
        entityKey: AppModule.Order,
        customer: values.customer,
        date: new Date(), // This will set the date to the current date and time
        invoiceTotal: values.invoiceTotal 
      })) ?? []
  } else if (instanceOfIProduct(props.item)) {
    localItems.value =
      (await useProductStore().createProduct({
        name: values.name,
        unitPrice: values.unitPrice,
        status: EntityStatus.Created,
        entityKey: AppModule.Product
      })) ?? []
  } else if (instanceOfICustomer(props.item)) {
    localItems.value =
      (await useCustomerStore().createCustomer({
        name: values.name,
        status: EntityStatus.Created,
        entityKey: AppModule.Customer
      })) ?? []
  }
}
</script>
<template>
  <div class="space-y-4">
    <DataTableToolbar :table="table" />
    <CreateDialog :onChange="(item: any) => handleOnChange(item)" :item="props.item" />
    <div>
      <div class="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
              <TableHead v-for="header in headerGroup.headers" :key="header.id">
                <FlexRender
                  v-if="!header.isPlaceholder"
                  :render="header.column.columnDef.header"
                  :props="header.getContext()"
                />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="table.getRowModel().rows?.length">
              <TableRow
                v-for="row in table.getRowModel().rows"
                :key="row.id"
                :data-state="row.getIsSelected() && 'selected'"
              >
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                </TableCell>
              </TableRow>
            </template>

            <TableRow v-else>
              <TableCell class="h-24 text-center"> No results. </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
    <DataTablePagination :table="table" />
  </div>
</template>
