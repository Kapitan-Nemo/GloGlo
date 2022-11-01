<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { useFinanceStore } from "@/stores/finance";

const finance = useFinanceStore();
const Header = defineAsyncComponent(() => import("@/components/HeaderBar.vue"));
const CategoryPanel = defineAsyncComponent(
  () => import("@/components/CategoryPanel.vue")
);
</script>

<template>
  <Header
    :msg="'You have total of ' + finance.categories.length + ' categories'"
  ></Header>

  <CategoryPanel />
</template>
