<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <main class="container p-4">
    {{ router.currentRoute.value.params.slug }}
  </main>
</template>
