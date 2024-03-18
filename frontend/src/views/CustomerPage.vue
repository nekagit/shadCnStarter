<script setup lang="ts">
import { useAppStore } from '@/stores/appStore'

import DataTable from '@/components/organisms/Tables/DataTable.vue'
import { AppModule, EntityStatus } from '@/interfaces/enums'
import { useCustomerStore } from '@/stores/customerStore'
import { onBeforeMount, ref } from 'vue'

import Button from '@/components/ui/button/Button.vue'
import { FormField } from '@/components/ui/form'
import type { ICustomer } from '@/interfaces/atoms/ICustomer'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import { Input } from '@/lib/registry/new-york/ui/input'
const createMode = ref(false)
const customerSchema = z.object({
  id: z.string().nullable(),
  name: z.string()
})

// Initialize formData
const formData = ref<ICustomer>({
  name: 'Initial Name',
  entityKey: AppModule.Customer,
  status: EntityStatus.None
})

// Define formSchema
const formSchema = toTypedSchema(customerSchema)

// Destructure useForm result
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: formData.value
})

const onSubmit = handleSubmit(async (values) => {
  console.log('onchange')
  // if (values.id) {
  //   await useCustomerStore().updateCustomerById(values.id, {
  //     name: values.name,
  //     status: EntityStatus.Created,
  //     entityKey: AppModule.Customer
  //   })
  // } else {
    localItems.value =
      (await useCustomerStore().createCustomer({
        name: values.name,
        status: EntityStatus.Created,
        entityKey: AppModule.Customer
      })) ?? []
  // }
})

const localItems = ref([] as any[])
onBeforeMount(async () => {
  await useAppStore().onInit()
  localItems.value = useAppStore().customers
})

const handleCreate = () => {
  createMode.value = !createMode.value
}
</script>

<template>
  <div class="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex items-center justify-between space-y-2 mx-auto">
      <div>
        <h2 class="text-4xl font-bold tracking-tight">Customer Management</h2>
        <p class="text-muted-foreground text-center">Table over Customer Datas</p>
      </div>
      <div class="flex items-center space-x-2"></div>
    </div>
    <Button @click="handleCreate" class="w-fit" >Create</Button>
    <div v-if="createMode" class="">
      <h1 class="text-3xl">Create Product: </h1>
      <form class="space-y-8 flex flex-row align-center justify-end items-center" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <Input class="w-fit" type="text" v-model="formData.name" v-bind="componentField" />
        </FormField>
        
          <Button class="m-0" type="submit"> Submit </Button>
          <Button class="m-0" type="button" @click="resetForm"> Reset </Button>
      </form>
    </div>
    <DataTable :data="localItems" />
    <!-- <div v-if="selectedRow?.id != undefined">
      <h1>Edit Selected Row</h1>
      <form class="space-y-8" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <Input type="text" v-model="customerItem" v-bind="componentField" />
        </FormField>
        
        <div class="flex gap-2 justify-start">
          <Button type="submit"> Submit </Button>
          <Button type="button" @click="resetForm"> Reset </Button>
        </div>
      </form>
    </div> -->
  </div>
</template>
<style scoped>

</style>