<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useFinanceStore } from "@/stores/finance";
import type { ICategories } from "@/utils/interface";
Chart.register(...registerables);

const finance = useFinanceStore();
const dataChart = ref<Array<number>>([]);

const financeColor = computed(() => {
  const arr = finance.records.map((data) => data.category.color);
  return [...new Map(arr.map((item) => [item, item])).values()];
});

const financeLabel = computed(() => {
  const arr = finance.records.map((data) => data.category.text);
  return [...new Map(arr.map((item) => [item, item])).values()];
});

const getValues = () => {
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
    getValues();
  },
  { deep: true }
);

const options = ref({
  plugins: {
    legend: {
      display: false,
      position: "top",
      labels: {
        usePointStyle: true,
        pointStyle: "rectRounded",
        boxWidth: 25,
        boxHeight: 25,
        padding: 25,
        color: "#7F8091",
        borderRadius: 20,
        font: {
          size: 15,
        },
      },
    },
  },
});

const chartData = computed(() => ({
  labels: financeLabel.value,
  datasets: [
    {
      data: dataChart.value,
      backgroundColor: financeColor.value,
      spacing: 5,
      borderWidth: 0,
      borderRadius: 25,
      cutout: "90%",
    },
  ],
}));
</script>

<template>
  <div class="dashboard__wrap">
    <h2 class="dashboard__title">Categories</h2>
    <div class="dashboard__chart">
      <DoughnutChart
        :width="300"
        :height="300"
        :chartData="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<style lang="scss">
.dashboard {
  &__wrap {
    background: #1e1f25;
    border-radius: 10px;
    width: 100%;
    &-header {
      display: flex;
      justify-content: space-between;
    }
  }
  &__chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  &__title {
    margin: 0;
    font-size: 25px;
  }
  &__button {
    width: 200px;
    height: 45px;
    padding: 0 15px 0 15px;
    border: solid 1px #292d39;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $secondary;
    background-color: transparent;
    border-radius: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
