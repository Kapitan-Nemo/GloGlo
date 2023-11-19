<script setup lang="ts">
import { Timestamp, collection, getFirestore } from '@firebase/firestore'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import type { IPost } from '@/utils/interface'
import DEFAULT_POST from '@/utils/constants'

const editID = useEditID()
const show = useShowPost()
const post = ref<IPost>(DEFAULT_POST)

watch(() => show.value.edit, (value) => {
  if (value) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape')
        show.value.edit = false
    })
  }
})

onMounted(async () => {
  createSlug(post)
})

watch(() => editID.value, async (value) => {
  if (value !== '' || null || undefined)
    await loadEditedPost()
})

async function loadEditedPost() {
  console.log(editID.value)
  if (editID.value !== '' || null || undefined) {
    const postRef = doc(getFirestore(), 'posts', editID.value)
    const docSnap = await getDoc(postRef)

    if (docSnap.exists())
      post.value = docSnap.data() as IPost

    else
      useToast('Nie znaleziono wpisu', 'error')
  }
}

async function saveProduct() {
  if (editID.value !== '' || null || undefined) {
    // Update post
    await updateDoc(doc(getFirestore(), 'posts', editID.value), {
      ...post.value,
    }).then(() => {
      useToast('Product updated successfully', 'success')
    }).catch((error) => {
      useToast(error, 'error')
    })
    editID.value = ''
  }
  else {
    // Create new post
    const posts = doc(collection(getFirestore(), 'posts'))
    const data = {
      ...post.value,
    }
    data.id = posts.id

    data.created_at = Timestamp.fromDate(new Date()).toDate()
    // Check if slug exists
    // if (posts.value.find(product => product.slug === posts.value.slug)) {
    //   useToast('Slug already exists', 'warning')
    //   return
    // }

    await setDoc(posts, data)
      .then(() => {
        useToast('Opublikowano wpis blogowy', 'success')
      })
      .catch((error) => {
        useToast(error, 'error')
      })
  }

  // Close Drawer
  show.value.edit = !show.value.edit
}
</script>

<template>
  <div :class="show.edit ? 'transform-none' : '-translate-x-full'" class="fixed w-1/2 top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-primary">
    <div class="border-b mb-4">
      <h1 class="inline-flex items-center mb-4 text-2xl text-white">
        <Icon size="30" class="text-red-300 mr-4" name="ion:ios-lightbulb-outline" />
        {{ !show.create ? 'Edytuj' : 'Dodaj' }} Wpis
      </h1>
      <button type="button" class="text-white p-1.5 absolute top-2.5 right-2.5 inline-flex items-center" @click="(show.edit = !show.edit) && (show.create = !show.create)">
        <Icon size="40" name="ion:close-circle-outline" />
      </button>
    </div>

    <div class="flex flex-col">
      <form id="save_product" class="flex" @submit.prevent="saveProduct()">
        <div class="w-full">
          <!-- Title  -->
          <label for="title" class="text-white text-xl">Tytuł wpisu</label>
          <input id="title" v-model="post.title" name="title" required class="my-4 p-4 w-full border-b border-white h-8 text-black focus:outline-none" type="textarea">

          <!-- Slug -->
          <label for="slug" class="text-white text-xl">Slug</label>
          <input id="slug" v-model="post.slug" name="slug" required class="my-4 p-4 w-full border-b border-white h-8 text-black focus:outline-none" type="text">

          <!-- Content  -->
          <label for="content" class="text-white text-xl">Treść wpisu</label>
          <textarea id="content" v-model="post.content" name="content" required rows="3" cols="40" class="my-4 p-4 w-full border-b border-white bg-dark-200 text-black focus:outline-none" type="textarea" />

          <!-- Meta Title -->
          <label for="meta_title" class="text-white text-xl">Meta Tytuł</label>
          <admin-progress-bar :value="post.meta_title.length" :max-value="60" />
          <input id="meta_title" v-model="post.meta_title" name="meta_title" required class="my-4 p-4 w-full border-b border-white h-8 text-black focus:outline-none" type="text">

          <!-- Meta Description -->
          <label for="meta_description" class="text-white text-xl">Meta Opis</label>
          <admin-progress-bar :value="post.meta_description.length" :max-value="160" />
          <textarea id="meta_description" v-model="post.meta_description" name="meta_description" required rows="3" cols="40" class="my-4 p-4 w-full border-b border-white bg-dark-200 text-black focus:outline-none" type="textarea" />

          <button class="bg-black border border-green-500 hover:bg-green-500 hover:text-black transition-colors text-white py-2 px-4 flex items-center justify-center">
            Zapisz <Icon class="ml-4" size="20" name="ion:ios-save" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
