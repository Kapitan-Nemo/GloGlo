<script setup lang="ts">
const { data: posts } = await useFetch('/api/posts')
</script>

<template>
  <main class="container flex items-center justify-center p-4">
    {{ posts }}
    <img src="~/assets/img/rabbit.png" alt="Wake up Neo">
  </main>
</template>
