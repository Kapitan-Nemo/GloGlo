<script setup lang="ts">
import { defineAsyncComponent } from "vue";
import { computed, ref, watch } from "vue";

import { useFinanceStore } from "@/stores/finance";
import type { ICategories } from "@/utils/interface";

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

const finance = useFinanceStore();
const dataChart = ref<Array<number>>([]);

const financeColor = computed(() => {
  const discountedProducts = finance.records.map((product) => ({
    color: product.category.color,
    category: product.category.text,
    id: product.category.id,
  }));
  //remove duplicates
  const uniqueProducts = discountedProducts.filter(
    (v, i, a) => a.findIndex((t) => t.category === v.category) === i
  );
  return uniqueProducts;
});
console.log(financeColor.value);

const financeCosts = () => {
  // Search Categories used in finance table
  const arr = finance.records.map((data) => data.category);
  // Filter duplicate Categories
  const searchCategories = [
    ...new Map(arr.map((item) => [item.id, item])).values(),
  ];
  searchCategories.forEach(categoriesCost);
};

const categoriesCost = (item: ICategories) => {
  const searchFinanceRecords = finance.records.filter(
    (element) => element.category.text == item.text
  );

  const dataCost = searchFinanceRecords.map((data) => data.cost);
  const sumCategoriesCost = dataCost.reduce((a, b) => a + b, 0);
  dataChart.value.push(sumCategoriesCost);
};

watch(
  () => finance.records,
  () => {
    dataChart.value = [];
    financeCosts();
  },
  { deep: true }
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
