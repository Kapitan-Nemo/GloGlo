<script setup lang="ts">
const show = useShowPost()
const title = ref('')
const content = ref('')
const slug = ref('')

watch(() => show.value.edit, (value) => {
  if (value) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape')
        show.value.edit = false
    })
  }
})

onMounted(async () => {
  createSlug(title, slug)
})
</script>

<template>
  <div :class="show.edit ? 'transform-none' : '-translate-x-full'" class="fixed w-1/2 top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-primary">
    <div class="border-b mb-4">
      <h1 class="inline-flex items-center mb-4 text-2xl text-white">
        <Icon size="30" class="text-red-300 mr-4" name="ion:ios-lightbulb-outline" />
        {{ !show.create ? 'Aktaulizuj' : 'Stwórz' }} Wpis blogowy
      </h1>
      <button type="button" class="text-white p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" @click="(show.edit = !show.edit) && (show.create = !show.create)">
        <Icon size="40" name="ion:close-circle-outline" />
      </button>
    </div>

    <div class="flex flex-col">
      <form id="save_product" class="flex" @submit.prevent="saveProduct(editProduct.id)">
        <div class="w-full">
          <!-- Title  -->
          <label for="title" class="text-white text-xl">Tytuł wpisu</label>
          <input id="title" v-model="title" name="title" required class="mb-3 p-4 w-full border-b border-white h-8  text-black focus:outline-none" type="textarea">

          <!-- Slug -->
          <label for="slug" class="text-white text-xl">Slug</label>
          <input id="slug" v-model="slug" name="slug" required class="mb-3 p-4 w-full border-b border-white  h-8  text-black focus:outline-none" type="text">

          <!-- Content  -->
          <label for="content" class="text-white text-xl">Treść wpisu</label>
          <textarea id="content" v-model="content" name="content" required rows="3" cols="40" class="mb-3 p-4 w-full border-b border-white bg-dark-200 text-black focus:outline-none" type="textarea" />

          <button class="bg-black border border-green-500 text-white py-2 px-4 flex items-center justify-center">
            Zapisz <Icon class="ml-4" size="20" name="ion:ios-save" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
