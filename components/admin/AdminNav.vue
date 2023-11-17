<script setup lang="ts">
const auth = useAuth()
</script>

<template>
  <nav class="w-full">
    <div class="px-3 py-3 lg:px-5 lg:pl-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-start">
          <div class="flex ml-2">
            <span class="text-2xl text-white">Witaj</span>
          </div>
        </div>
        <div class="flex items-center">
          <button type="button" class="p-2">
            <Icon class="text-red-300" size="30" name="ion:diamond-sharp" />
          </button>

          <div class="flex items-center ml-3">
            <img class="w-8 h-8" :src="auth.userPhoto ? auth.userPhoto : '' " alt="user photo">
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
