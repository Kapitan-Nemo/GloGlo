<script setup lang="ts">
const show = ref({
  edit: false,
  create: false,
})
</script>

<template>
  <!-- drawer component -->
  <button @click="show.create = true, show.edit = true">
    Here
  </button>
  <div :class="show.edit ? 'transform-none' : '-translate-x-full'" class="fixed w-full top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-primary">
    <h1 class="inline-flex items-center mb-4 text-2xl text-white">
      <svg class="w-5 h-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>
      {{ !show.create ? 'Aktaulizuj' : 'Stwórz' }} Wpis blogowy
    </h1>
    <button type="button" class="text-white hover:bg-dark-100 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" @click="(show.edit = !show.edit) && (show.create = !show.create)">
      <Icon name="ion:close-outline" class="w-5 h-5 mr-1" />
    </button>
    <div class="flex flex-col">
      <form id="save_product" class="flex" @submit.prevent="saveProduct(editProduct.id)">
        <div class="w-1/2">
          <label for="title" class="font-bold text-white text-xl">Title:</label>
          <!-- <textarea id="title" v-model="editProduct.title" name="title" required rows="3" cols="40" class="mb-3 w-full border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="textarea" /> -->
          <label for="description" class="font-bold text-white text-xl">Description:</label>
          <!-- <textarea id="description" v-model="editProduct.description" name="description" required rows="3" cols="40" class="mb-3 w-full border-b border-white bg-dark-200 text-white caret-white placeholder-gray-500 focus:outline-none" type="textarea" /> -->
          <label for="price" class="font-bold text-white text-xl">Price:</label>
          <!-- <input id="price" v-model="editProduct.price" name="price" required class="mb-3 w-full border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none" type="text"> -->
          <label for="quantity" class="font-bold text-white text-xl">Quantity:</label>
          <!-- <input id="quantity" v-model="editProduct.quantityInWarehouse" name="quantity" required class="mb-3 w-full border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none" type="text"> -->
          <label for="slug" class="font-bold text-white text-xl">Slug:</label>
          <!-- <input id="slug" v-model="editProduct.slug" name="slug" required class="mb-3 w-full border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none" type="text"> -->
          <label for="featured" class="font-bold text-white text-xl">Feautred:</label>
          <div class="flex justify-start items-center mb-3">
            <!-- <input id="featured" v-model="editProduct.featured" type="checkbox" class="border-b border-white bg-dark-200 h-8 text-white caret-white placeholder-gray-500 focus:outline-none"> -->
            <!-- <label for="featured" class="text-white ml-3">{{ editProduct.featured ? 'YES' : 'NO' }}</label> -->
          </div>
          <button class="btn-product bg-black text-white font-bold py-2 px-4">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
