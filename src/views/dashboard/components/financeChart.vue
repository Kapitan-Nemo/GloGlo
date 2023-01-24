<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useFinanceStore } from "@/stores/finance";
import type { ICategories } from "@/utils/interface";
ChartJS.register(ArcElement, Tooltip, Legend);

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
  dataChart.value.push(
    searchFinanceRecords.map((data) => data.cost).reduce((a, b) => a + b, 0)
  );
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
      display: true,
      position: "bottom",
      labels: {
        usePointStyle: true,
        pointStyle: "rectRounded",
        boxWidth: 25,
        boxHeight: 25,
        padding: 25,
        color: "#7F8091",
        borderRadius: 20,
        font: {
          size: 12,
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
      borderWidth: 0,
      borderRadius: 15,
      spacing: 10,
      cutout: "90%",
    },
  ],
}));
</script>

<template>
  <div class="donutchart__wrap">
    <h2 class="donutchart__title">Categories</h2>
    <div class="donutchart__chart">
      <Doughnut
        :width="300"
        :height="300"
        :data="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<style lang="scss">
.donutchart {
  &__wrap {
    background: #1e1f25;
    border-radius: 10px;
    width: 100%;

    padding: 25px;
  }
  &__chart {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 500px;
  }
  &__title {
    margin: 0;
    font-size: 25px;
  }
}
</style>
