<template>
  <component :is="icon" />
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});

const icon = defineAsyncComponent(
  () => import(`@/assets/icons/avatars/${props.name}.svg?component`)
);
console.log(icon);
</script>
