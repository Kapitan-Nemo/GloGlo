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

// single ref
watch(
  () => finance.records,
  (newVal, oldVal) => {
    dataChart.value = [];
    getValues();
  },
  { deep: true }
);

const options = ref({
  responsive: true,
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
  <div class="donutchart__wrap">
    <h2 class="donutchart__title">Categories</h2>
    <div class="donutchart__chart">
      <DoughnutChart
        ref="doughnutRef"
        :width="300"
        :height="300"
        :chartData="chartData"
        :options="options"
      />
    </div>
  </div>
</template>

<style lang="scss">
.dp__theme_dark {
  --dp-background-color: #212121;
  --dp-text-color: #ffffff;
  --dp-hover-color: #484848;
  --dp-hover-text-color: #ffffff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #00dee2;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #2d2d2d;
  --dp-menu-border-color: #2d2d2d;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-highlight-color: rgba(0, 92, 178, 0.2);
}
.dp__overlay {
  background: $bg-primary;
}
.donutchart {
  &__wrap {
    background: #1e1f25;
    border-radius: 10px;
    width: 100%;
    padding: 25px;
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
