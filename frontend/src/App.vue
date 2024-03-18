<template>

  <div class="flex gap-3">
    <Sidebar class="h-full sticky top-16" />
    <div class="flex flex-col flex-grow">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import "@/assets/base.css"
import "@/assets/index.css"
import "@/assets/main.css"
import Sidebar from "@/components/molekules/Sidebar.vue"
import { RouterView } from 'vue-router'
</script>

<style scoped>
</style>
