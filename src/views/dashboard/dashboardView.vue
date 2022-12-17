<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("@/components/headerBar.vue"));
const FinancePanels = defineAsyncComponent(
  () => import("@/views/dashboard/components/financePanels.vue")
);
const FinanceTable = defineAsyncComponent(
  () => import("@/views/dashboard/components/financeTable.vue")
);
const FinanceChart = defineAsyncComponent(
  () => import("@/views/dashboard/components/financeChart.vue")
);
</script>

<template>
  <Header
    msg="Today the overall efficiency is 153%. Otherwise, there is nothing new."
  ></Header>

  <div class="dashboard">
    <div class="dashboard__wrapper">
      <finance-panels />
      <finance-table />
    </div>
    <finance-chart />
  </div>
</template>

<style lang="scss">
.dashboard {
  display: flex;
  flex-flow: row;

  &__wrapper {
    display: flex;
    flex-flow: column;
    // max-width: 70%;
  }
}
</style>
