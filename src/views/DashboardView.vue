<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Header = defineAsyncComponent(() => import("@/components/HeaderBar.vue"));
const FinancePanels = defineAsyncComponent(
  () => import("@/components/FinancePanels.vue")
);
const FinanceTable = defineAsyncComponent(
  () => import("@/components/FinanceTable.vue")
);
// const FinanceChart = defineAsyncComponent(
//   () => import("@/components/FinanceChart.vue")
// );
</script>

<template>
  <Header
    msg="Today the overall efficiency is 153%. Otherwise, there is nothing new."
  ></Header>

  <div class="dashboard">
    <div class="dashboard__wrapper">
      <FinancePanels></FinancePanels>
      <FinanceTable></FinanceTable>
    </div>
    <!-- <FinanceChart></FinanceChart> -->
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
