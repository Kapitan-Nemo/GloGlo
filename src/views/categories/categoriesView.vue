<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useFinanceStore } from "@/stores/finance";

const finance = useFinanceStore();
const Header = defineAsyncComponent(() => import("@/components/headerBar.vue"));
const categoryPanel = defineAsyncComponent(
  () => import("@/views/categories/components/categoryPanel.vue")
);
</script>

<template>
  <Header
    :msg="'You have total of ' + finance.categories.length + ' categories'"
  ></Header>

  <category-panel />
</template>
