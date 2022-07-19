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
import Header from "@/components/HeaderBar.vue";
import FinancePanels from "@/components/FinancePanels.vue";
import FinanceTable from "@/components/FinanceTable.vue";
</script>
