<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {productItem, customerItem, invoiceItem} from "@/components/organisms/Tables/Custom/tableService"
import CreateDialogForm from '@/components/organisms/Forms/CreateDialogForm.vue';
 // Define props
const props = defineProps<{
  onChange: (item: any) => Promise<void>
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button> Create </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit/Create </DialogTitle>
      </DialogHeader>
      <DialogDescription>
        <Tabs default-value="product" class="w-[400px]">
    <TabsList>
      <TabsTrigger value="product">
        product
      </TabsTrigger>
      <TabsTrigger value="customer">
        customer
      </TabsTrigger>  
         <TabsTrigger value="invoice">
        invoice
      </TabsTrigger>
    </TabsList>
    <TabsContent value="product">
      <CreateDialogForm :item="productItem" :onChange="props.onChange"/>
    </TabsContent>
    <TabsContent value="customer">
      <CreateDialogForm :item="customerItem" :onChange="props.onChange"/>
    </TabsContent>
    <TabsContent value="invoice">
      <CreateDialogForm :item="invoiceItem" :onChange="props.onChange"/>
    </TabsContent>
  </Tabs>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>
