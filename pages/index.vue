<script setup lang="ts">
const { data: blog } = await useFetch('/api/blog')
</script>

<template>
  <main class="container flex items-center justify-center p-4">
    {{ blog }}
    <!-- <img src="~/assets/img/rabbit.png" alt="Wake up Neo"> -->
  </main>
</template>
