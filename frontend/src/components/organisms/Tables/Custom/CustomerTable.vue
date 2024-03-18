<script setup lang="ts">
import CustomTable from '@/components/organisms/Tables/Custom/CustomTable.vue';
import { customerItem } from './tableService';
</script>
<template>
<CustomTable :item="customerItem" />  
</template>
