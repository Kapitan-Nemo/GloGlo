<script setup lang="ts">
import { useShowMedia } from '~/composables/states'

const show = useShowPost()
const showMedia = useShowMedia()
const post = usePost()

function createPost() {
  show.value.drawer = true
  show.value.create = true
  post.value = cleanPost()
}

function createMedia() {
  console.log('createMedia')
  showMedia.value = true
}
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
        <li class="flex items-center text-white cursor-pointer hover:text-red-300 transition-colors" @click="createPost()">
          <div class="gap-4 flex items-center">
            <Icon size="30" name="ion:add-circle-outline" />
            <span>Nowy wpis</span>
          </div>
        </li>
        <li class="flex items-center text-white cursor-pointer hover:text-red-300 transition-colors" @click="createMedia()">
          <div class="gap-4 flex items-center">
            <Icon size="30" name="ion:image" />
            <span>Media</span>
          </div>
        </li>
      </ul>
    </div>
  </aside>
</template>
