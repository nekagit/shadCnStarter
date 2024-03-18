<template>
  <div class="sticky z-40 top-0 right-0 backdrop-blur-lg">
    <div class="border-b">
      <div class="flex h-16 items-center px-4">
        <h1 class="font-weight text-xl" style="min-width: 200px; margin:0 0 0 15px">
          Shop
        </h1>
        <div class="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import UserNav from "@/components/molekules/UserNav.vue";
</script>