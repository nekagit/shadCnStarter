<template>
    <div>
<div class="flex gap-2 items-center py-4">
      <div class="flex gap-2 items-center py-4">
        <DropdownMenuRoot>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="outline" class="ml-auto">
                Columns <ChevronDown class="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem
                v-for="column in props.table.getAllColumns().filter((column) => column.getCanHide())"
                :key="column.id"
                class="capitalize"
                :checked="column.getIsVisible()"
                @update:checked="
                  (value) => {
                    column.toggleVisibility(!!value)
                  }
                "
              >
                {{ column.id }}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </DropdownMenuRoot>
      </div>
    </div>
    
    </div>
</template>

<script setup lang="ts">
import type { Table } from '@tanstack/vue-table';
import type { IBaseColumn } from './DataTable.vue';

 import type { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';



interface DataTableDropDownProps {
  table: Table<IBaseColumn>
}
const props = defineProps<DataTableDropDownProps>()
</script>

<style lang="scss" scoped>

</style>