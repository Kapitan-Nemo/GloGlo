<template>
  <div v-if="finance.chartValues <= [0] || null">
    <p>There is no data!</p>
  </div>
  <div v-else class="dashboard__chart">
    <DoughnutChart
      ref="doughnutRef"
      :width="300"
      :height="300"
      :chartData="testData"
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

const testData = computed(() => ({
  labels: finance.chartLabels,
  datasets: [
    {
      data: finance.chartValues,
      backgroundColor: finance.chartColors,
      spacing: 15,
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
    display: flex;
    align-items: center;
    background: #1e1f25;
    border-radius: 10px;
    padding: 25px;
  }
}
</style>
