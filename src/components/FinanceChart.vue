<template>
  <div class="dashboard__wrap">
    <div class="dashboard__wrap-header">
      <h2 class="dashboard__title">Categories</h2>
      <button class="dashboard__button">
        Overall<ChevronDownIcon></ChevronDownIcon>
      </button>
    </div>
    <div class="dashboard__chart">
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

<script setup lang="ts">
import { computed, ref } from "vue";
import { DoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { useFinanceStore } from "@/stores/finance";
import ChevronDownIcon from "@/components/icons/IconChevronDown.vue";

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
  &__wrap {
    background: #1e1f25;
    border-radius: 10px;
    padding: 25px;
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
