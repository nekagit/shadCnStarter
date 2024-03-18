<script setup lang="ts">
import CustomTable from '@/components/organisms/Tables/Custom/CustomTable.vue';
import { invoiceItem } from './tableService';
</script>
<template>
<CustomTable :item="invoiceItem" />  
</template>
