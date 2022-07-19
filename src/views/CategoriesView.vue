<template>
  <Header msg="You have total of 15 categories. Add more now!"></Header>
  <CategoriesEdit></CategoriesEdit>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("@/components/HeaderBar.vue"));
const CategoriesEdit = defineAsyncComponent(
  () => import("@/components/CategoriesEdit.vue")
);
</script>
