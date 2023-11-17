<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: [
    'admin',
  ],
})
</script>

<template>
  <div>
    <AdminNav class="border-b" />
    <div class="flex">
      <AdminAside class="border-r" />
      <div class="p-6 w-full">
        <AdminPostsList />
        <AdminAddPost />
      </div>
    </div>
  </div>
</template>
