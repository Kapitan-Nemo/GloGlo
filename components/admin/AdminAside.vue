<script setup lang="ts">
const show = useShowPost()
</script>

<template>
  <aside id="sidebar" class="flex flex-col w-64 h-full bg-dark-100" aria-label="Sidebar">
    <div class="flex flex-col h-screen mt-4">
      <ul class="flex gap-4 flex-col p-4">
        <li class="flex items-center text-white hover:text-red-300 transition-colors">
          <nuxt-link to="/admin" class="gap-4 flex w-full items-center">
            <Icon size="30" name="ion:home-outline" />
            <span>Kokpit</span>
          </nuxt-link>
        </li>
        <li class="flex items-center text-white cursor-pointer hover:text-red-300 transition-colors" @click="show.create = true, show.edit = true">
          <div class="gap-4 flex items-center">
            <Icon size="30" name="ion:add-circle-outline" />
            <span>Nowy wpis</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
