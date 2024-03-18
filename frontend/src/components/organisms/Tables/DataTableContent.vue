<template>
  <div>
    <div class="rounded-md border w-fit ml-auto">
      <Table>
        <TableHeader>
          <TableRow v-for="headerGroup in props.table.getHeaderGroups()" :key="headerGroup.id">
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
          <template v-if="props.table.getRowModel().rows?.length">
            <TableRow
              v-for="row in props.table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell  class="h-24 text-center">
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/lib/registry/new-york/ui/table';
import type { Table } from '@tanstack/vue-table';
import {
    FlexRender
} from '@tanstack/vue-table';
import type { IBaseColumn } from './tablesFunctions';


interface DataTableContentProps {
  table: Table<IBaseColumn>
}
const props = defineProps<DataTableContentProps>()
</script>

<style lang="scss" scoped></style>
