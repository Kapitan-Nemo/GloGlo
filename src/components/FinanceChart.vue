<template>
  <div class="dashboard__chart">
    <h2 class="dashboard__title">Categories</h2>
    <DoughnutChart
      ref="doughnutRef"
      :width="300"
      :height="300"
      :chartData="chartData"
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useFinanceStore } from "@/stores/finance";

const finance = useFinanceStore();
Chart.register(...registerables);
const doughnutRef = ref();
const options = ref({
  // resposive: true,
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
  labels: finance.chartLabels,
  datasets: [
    {
      data: finance.chartValues,
      backgroundColor: finance.chartColors,
      spacing: 5,
      borderWidth: 0,
      borderRadius: 25,
      cutout: "90%",
    },
  ],
}));
</script>

<style lang="scss">
.dashboard {
  &__chart {
    background: #1e1f25;
    border-radius: 10px;
    padding: 25px;
  }
  &__title {
    margin: 0 0 30px 0;
    font-size: 25px;
  }
}
</style>
