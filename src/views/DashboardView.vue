<template>
  <Header
    msg="Today the overall efficiency is 153%. Otherwise, there is nothing new."
  ></Header>

  <div class="dashboard">
    <FinancePanels></FinancePanels>
    <FinanceTable></FinanceTable>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("@/components/HeaderBar.vue"));
const FinancePanels = defineAsyncComponent(
  () => import("@/components/FinancePanels.vue")
);
const FinanceTable = defineAsyncComponent(
  () => import("@/components/FinanceTable.vue")
);
</script>
