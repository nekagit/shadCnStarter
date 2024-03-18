<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'

import DataTable from '@/components/organisms/Tables/DataTable.vue'
import { AppModule, EntityStatus } from '@/interfaces/enums'
import { useProductStore } from '@/stores/productsStore'
import { onBeforeMount, ref } from 'vue'

import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import type { IProduct } from '@/interfaces/atoms/IProduct'

import { Input } from '@/lib/registry/new-york/ui/input'

const productSchema = z.object({
  name: z.string(),
  unitPrice: z.number()
})

const formData = ref<IProduct>({
  name: 'Initial Name',
  unitPrice: 0,
  entityKey: AppModule.Product,
  status: EntityStatus.None
})

const formSchema = toTypedSchema(productSchema)

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: formData.value
})

const onSubmit = handleSubmit(async (values) => {
  console.log('onchange')
  localItems.value =
    (await useProductStore().createProduct({
      name: values.name,
      unitPrice: values.unitPrice,
      status: EntityStatus.Created,
      entityKey: AppModule.Product
    })) ?? []
})

const localItems = ref([] as any[])
onBeforeMount(async () => {
  await useAppStore().onInit()
  localItems.value = useAppStore().products
  console.log(localItems.value)
  localItems.value.push({
    id: 'aaaaaa',
    name: 'sadf',
    unitPrice: 0,
    entityKey: AppModule.Product,
    status: EntityStatus.Created
  } as IProduct)
  
  localItems.value.push({
    id: 'cccc',
    name: 'efqwerqwr',
    unitPrice: 0,
    entityKey: AppModule.Product,
    status: EntityStatus.Created
  } as IProduct)
  
  localItems.value.push({
    id: 'bbbb',
    name: 'sadfsadff',
    unitPrice: 0,
    entityKey: AppModule.Product,
    status: EntityStatus.Created
  } as IProduct)
})
const createMode = ref(false)

const handleCreate = () => {
  createMode.value = !createMode.value
}


</script>

<template>
  <div class="flex items-center justify-between space-y-2 mx-auto mt-5">
    <div>
      <h2 class="text-4xl mx-auto font-bold tracking-tight">Product Management</h2>
      <p class="text-muted-foreground text-center">Table over Product Datassss</p>
    </div>
    <div class="flex items-center space-x-2"></div>
  </div>
  <Button @click="handleCreate" class="w-fit">Create</Button>

  <div class="hidden h-full flex-1 flex-row space-y-8 p-8 md:flex">
    <div v-if="createMode" class="mx-auto">
      <form class="space-y-8" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name ">
          <Input class="w-fit" type="text" v-model="formData.name" v-bind="componentField" />
          Name
        </FormField>
        <FormField v-slot="{ componentField }" name="unitPrice">
          <Input class="w-fit" type="number" v-model="formData.unitPrice" v-bind="componentField" />
          UnitPrice
        </FormField>

        <div class="flex gap-2 justify-start">
          <Button type="submit"> Submit </Button>
          <Button type="button" @click="resetForm"> Reset </Button>
        </div>
      </form>
    </div>
  <Button @click="handleEdit" class="w-fit">Edit</Button>

  <div class="hidden h-full flex-1 flex-row space-y-8 p-8 md:flex">
    <div v-if="editMode" class="mx-auto">
      <form class="space-y-8" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name ">
          <Input class="w-fit" type="text" v-model="formData.name" v-bind="componentField" />
          Name
        </FormField>
        <FormField v-slot="{ componentField }" name="unitPrice">
          <Input class="w-fit" type="number" v-model="formData.unitPrice" v-bind="componentField" />
          UnitPrice
        </FormField>

        <div class="flex gap-2 justify-start">
          <Button type="submit"> Submit </Button>
          <Button type="button" @click="resetForm"> Reset </Button>
        </div>
      </form>
    </div>
    <DataTable :data="localItems" />
  </div>
  </div>
</template>
