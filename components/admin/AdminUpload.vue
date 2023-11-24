<script setup lang="ts">
import { deleteObject, getDownloadURL, getStorage, listAll, ref as storageRef, uploadBytesResumable } from 'firebase/storage'

const storage = getStorage()
const fileInput = ref<HTMLInputElement | null>(null)
const files = ref()
const images = ref([{
  url: '',
  name: '',
}])
const progress = ref(0)

async function uploadFile() {
  files.value = fileInput.value?.files
  if (files.value)
    saveFile()
}

function saveFile() {
  const metadata = {
    contentType: 'image/png',
  }

  const file = files.value[0]
  const storageReference = storageRef(storage, `blog/${file.name}`)
  const uploadTask = uploadBytesResumable(storageReference, file, metadata)

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed', (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    progress.value = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(2) as unknown as number
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused')
        break
      case 'running':
        console.log('Upload is running')
        break
    }
  }, (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        useToast(error.code, 'error')
        break
      case 'storage/canceled':
        useToast(error.code, 'error')
        // User canceled the upload
        break
      case 'storage/unknown':
        useToast(error.code, 'error')
        // Unknown error occurred, inspect error.serverResponse
        break
    }
  }, () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then(() => {
      useToast('Zdjęcie załadowane pomyślnie.', 'success')
      getAllImages()
      // clear input and progress bar
      progress.value = 0
      fileInput.value!.value = ''
    })
  })
}

function deleteFile(name: string) {
  const deleteReference = storageRef(storage, `blog/${name}`)
  deleteObject(deleteReference).then(() => {
    useToast('Pomyślnie usunięto zdjęcie', 'success')
    getAllImages()
  }).catch((error) => {
    useToast(error.message, 'error')
  })
}

onMounted(() => {
  getAllImages()
})

async function getAllImages() {
  const imageRef = storageRef(storage, 'blog/')
  // List all files in the directory
  const res = await listAll(imageRef)
  // Get download URL and name for each file
  const urlsAndNames = await Promise.all(res.items.map(async (item) => {
    const url = await getDownloadURL(item)
    const name = item.name
    return { url, name }
  }))
  // store urls and names in ref variable so it can be used in template
  // sort by name alphabetically (a-z)
  return images.value = urlsAndNames.sort((a, b) => a.name.localeCompare(b.name))
}

async function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  useToast('Skopiowano link do schowka', 'success')
}
</script>

<template>
  <label class="upload-label" for="upload_file">Załaduj Zdjęcie</label>
  <input id="upload_file" ref="fileInput" name="upload_file" class="upload-input" type="file" @change="uploadFile">
  <div class="h-1 bg-white" :style="{ width: `${progress}%` }" />
  <div v-if="progress" class="text-white">
    {{ progress }}%
  </div>

  <table class="table-auto">
    <thead>
      <tr>
        <th class="px-4 py-2">
          Zdjęcie
        </th>
        <th class="px-4 py-2">
          Nazwa
        </th>
        <th class="px-4 py-2">
          URL
        </th>
        <th class="px-4 py-2">
          Usuń
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in images" :key="i.url">
        <td class="border px-4 py-2">
          <img :src="i.url" alt="" class="w-20 h-20 object-cover">
        </td>
        <td class="border px-4 py-2">
          {{ i.name }}
        </td>
        <td class="border px-4 py-2">
          <p class="cursor-pointer" :href="i.url" target="_blank" @click="copyToClipboard(i.url)">
            Link
            <Icon class="ml-4" size="30" name="ion:copy-outline" />
          </p>
        </td>
        <td class="border px-4 py-2">
          <button class="text-white" @click="deleteFile(i.name)">
            <Icon size="30" name="ion:trash-outline" />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.upload-label {
  display: inline-block;
  padding: 10px 20px;
  /* background-color: #4CAF50; */
  border: solid 1px white;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
}

.upload-input {
  display: none;
}
</style>
