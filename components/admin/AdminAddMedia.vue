<script setup lang="ts">
import { useShowMedia } from '~/composables/states'

const show = useShowMedia()
</script>

<template>
  <div :class="show ? 'transform-none' : '-translate-x-full'" class="fixed w-1/2 top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-primary">
    <div class="border-b mb-4">
      <h1 class="inline-flex items-center mb-4 text-2xl text-white">
        <Icon size="30" class="text-red-300 mr-4" name="ion:ios-lightbulb-outline" />
        Bibloteka mediów
      </h1>
      <button type="button" class="text-white p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" @click="show = false">
        <Icon size="40" name="ion:close-circle-outline" />
      </button>
    </div>

    <div class="flex flex-col">
      <AdminUpload />
    </div>
  </div>
</template>
