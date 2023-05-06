<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import icon from '@/components/dynamicIcon.vue'
const Header = defineAsyncComponent(() => import('@/components/headerBar.vue'))
</script>

<template>
  <Header msg="Page not found - return to dashboard!"></Header>
  <router-link to="/">
    <button class="notfound__button">
      Back to live <icon name="arrow-down" path="actions"></icon>
    </button>
  </router-link>
</template>

<style lang="scss">
.notfound {
  &__button {
    width: 200px;
    height: 45px;
    padding: 0 15px 0 15px;
    border: solid 1px #292d39;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    background-color: transparent;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
