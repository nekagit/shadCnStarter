<script setup lang="ts">
import type { Table } from '@tanstack/vue-table'
import { computed } from 'vue'

import { Button } from '@/lib/registry/new-york/ui/button'
import { Input } from '@/lib/registry/new-york/ui/input'
import { Cross2Icon } from '@radix-icons/vue'
import type { IBaseColumn } from './DataTable.vue'
import DataTableViewOptions from './DataTableViewOptions.vue'

interface DataTableToolbarProps {
  table: Table<IBaseColumn>
}

const props = defineProps<DataTableToolbarProps>()

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0)
</script>

<template>
  <div class="flex items-center">
    <div class="flex ml-auto space-x-2">
      <Input
        placeholder="Filter..."
        :model-value="(table.getColumn('name')?.getFilterValue() as string) ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('name')?.setFilterValue($event.target.value)"
      />
      <!-- <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :statuses="statuses"
      />
    -->
      <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="table.resetColumnFilters()"
      >
        Reset
        <Cross2Icon class="ml-2 h-4 w-4" />
      </Button>
    </div>
    <DataTableViewOptions :table="table" />
  </div>
</template>