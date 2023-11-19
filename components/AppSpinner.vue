<template>
  <div>
    <Icon name="ion:refresh-sharp" size="30" class="text-red-300 spinner" />
  </div>
</template>

<style lang="scss" scoped>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.spinner {
  animation: spin 2s linear infinite;
}
</style>
