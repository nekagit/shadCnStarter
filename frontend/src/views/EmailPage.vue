<script lang="ts" setup>
import Mail from '@/components/molekules/Mail.vue';
import { accounts, mails } from '@/interfaces/mail';
</script>
<template>
     <div class="md:hidden w-full">
    <image
      src="/examples/mail-dark.png"
      :width="1280"
      :height="727"
      alt="Mail"
      class="hidden dark:block"
    />
    <image
      src="/examples/mail-light.png"
      :width="1280"
      :height="727"
      alt="Mail"
      class="block dark:hidden"
    />
  </div>
  <div class="hidden flex-col md:flex">
    <Mail
      :accounts="accounts"
      :mails="mails"
      :nav-collapsed-size="4"
    />
  </div>
</template>
@/interfaces/mail