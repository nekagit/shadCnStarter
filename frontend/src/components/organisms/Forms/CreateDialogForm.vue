<template>
    <div>
 <form class="space-y-8"  @submit.prevent="handleSub" >
          <FormField
            v-for="(value, key) in formData"
            :key="key"
            v-slot="{ componentField }"
            :name="key"
          >
            <FormItem>
              <FormLabel>{{ key }}</FormLabel>
              <FormControl>
                <Input
                  v-if="typeof value === 'number'"
                  type="number"
                  placeholder="0"
                  v-bind="componentField"
                />

                <Input
                  v-else-if="typeof value === 'string'"
                  type="text"
                  v-model="formData[key]"
                  v-bind="componentField"
                />

                  <Select  v-else
                  v-model="formData[key]"
                  :options="customersIDs"
                  v-bind="componentField">

                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an customer" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="customer in customersIDs" :key="customer" :value="customer">
                      {{ customer }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <div class="flex gap-2 justify-start">
            <Button type="submit"> Submit </Button>
            <Button type="button" @click="resetForm"> Reset </Button>
          </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { z } from 'zod'

import Button from '@/components/ui/button/Button.vue'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form'
import { useAppStore } from '@/stores/appStore'
import { onBeforeMount, ref } from 'vue'

import { Input } from '@/lib/registry/new-york/ui/input'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/lib/registry/new-york/ui/select'
import type { IForm } from '../../organisms/Tables/tablesFunctions'


// Define props
const props = defineProps<{
  onChange: (item: any) => Promise<void>
  item: any
}>()
 

const shopModalSchema = z.object({
  name: z.string(),
  unitPrice: z.number(),
  number: z.number(),
  invoiceTotal: z.number(),
  customer: z.string(),
  quantity: z.number(),
});
// Define FormData interface
interface FormData {
  [key: string]: string | number | null
}

// Initialize formData
const formData = ref<IForm>({
  name: 'Initial Name',
  unitPrice: 10,
  number: 0,
  invoiceTotal: 0,
  customer: undefined,
  quantity: 0,
})

// Define formSchema
const formSchema = toTypedSchema(shopModalSchema)

// Destructure useForm result
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: formData.value
})
const handleSub = handleSubmit((values) => {
  console.log('Submit button clicked. Values:', values); // Add this line
  props.onChange(values);
});

// Initialize customersIDs
const customersIDs = ref<string[]>([''])

// Fetch customers IDs on component mount
onBeforeMount(async () => {
  const appStore = useAppStore()
  const customers = appStore.customers
  customersIDs.value = customers.map((x) => x._id ?? '')
})


// Define method to filter formData keys based on props.item
const filterFormDataKeys = () => {
  const filteredKeys = Object.keys(formData.value).filter(key => props.item.hasOwnProperty(key))
  const filteredFormData: FormData = {}
  filteredKeys.forEach(key => {
    filteredFormData[key] = formData.value[key]
  })
  formData.value = filteredFormData
}
filterFormDataKeys()
console.log(formData.value, formSchema)

</script>

<style lang="scss" scoped>

</style>