<script setup lang="ts">
const props = defineProps({
  value: {
    type: Number,
    default: 0,
  },
  maxValue: {
    type: Number,
    default: 100,
  },
})

const progress = computed(() => (props.value / props.maxValue) * 100)
const color = computed(() => {
  if (props.value <= props.maxValue)
    return 'green'
  return 'red'
})
</script>

<template>
  <div class="progress-bar" :style="{ backgroundColor: color, width: `${progress}%` }" />
</template>

<style scoped>
.progress-bar {
  height: 20px;
}
</style>
