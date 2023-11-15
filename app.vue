<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    <NuxtPage class="flex-grow" />
    <AppFooter />
  </div>
</template>

<style lang="scss">
body {
  @apply bg-primary;
  color: #fff;
}
</style>
