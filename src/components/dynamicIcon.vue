<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
})

const icon = defineAsyncComponent(
  () => import(`@/assets/svg/${props.path}/${props.name}.svg?component`),
)
</script>

<template>
  <component :is="icon" />
</template>
