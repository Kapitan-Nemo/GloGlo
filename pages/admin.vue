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
    <AdminNav class="border-b border-dark-200" />
    <div class="flex bg-dark-100">
      <AdminAside class="border-r border-dark-200" />
      <div class="p-6 w-full">
        <AdminPostsList />
        <AdminAddPost />
      </div>
    </div>
  </div>
</template>
