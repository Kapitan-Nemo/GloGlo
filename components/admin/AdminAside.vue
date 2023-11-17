<script setup lang="ts">
const show = useShowProduct()
</script>

<template>
  <aside id="sidebar" class="flex flex-col w-64 h-full bg-dark-100" aria-label="Sidebar">
    <div class="flex flex-col h-screen">
      <ul class="flex gap-4 flex-col p-4">
        <li class="flex items-center text-white">
          <nuxt-link to="/admin" class="gap-4 flex w-full items-center">
            <Icon size="30" name="ion:home-outline" />
            <span>Dasboard</span>
          </nuxt-link>
        </li>
        <li class="flex items-center text-white" @click="show.create = true, show.edit = true">
          <div class="gap-4 flex items-center">
            <Icon size="30" name="ion:add-circle-outline" />
            <span>Add new post</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
