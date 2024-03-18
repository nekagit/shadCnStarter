<script setup lang="ts">
import { cn } from '@/lib/utils'
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 lg:space-x-6', $attrs.class ?? '')">
    <router-link to="/"
      ><a class="text-sm font-medium transition-colors hover:text-primary">Overview</a></router-link
    >
    <router-link to="/email"
      ><a class="text-sm font-medium transition-colors hover:text-primary">Email</a></router-link
    >
    <router-link to="/customers"
      ><a class="text-sm font-medium transition-colors hover:text-primary"
        >Customers</a
      ></router-link
    >
    <router-link to="/products"
      ><a class="text-sm font-medium transition-colors hover:text-primary">Products</a></router-link
    >
    <router-link to="/fulfillment"
      ><a class="text-sm font-medium transition-colors hover:text-primary"
        >Fulfillment</a
      ></router-link
    >
    <router-link to="/invoice"
      ><a class="text-sm font-medium transition-colors hover:text-primary">Invoice</a></router-link
    >
  </nav>
</template>
