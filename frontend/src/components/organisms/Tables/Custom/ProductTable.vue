<script setup lang="ts">
import CustomTable from '@/components/organisms/Tables/Custom/CustomTable.vue';
import { productItem } from './tableService';
</script>
<template>
<CustomTable :item="productItem" />  
</template>
