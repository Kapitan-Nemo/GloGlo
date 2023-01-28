<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "vue-chartjs";
import { useFinanceStore } from "@/stores/finance";
import { financeCosts } from "@/composables/useCosts";
ChartJS.register(ArcElement, Tooltip, Legend);

const finance = useFinanceStore();
onMounted(() => {
  setTimeout(() => {
    financeCosts();
  }, 1000);
});

watch(
  //TODO:improve watcher
  () => finance.records,
  () => {
    financeCosts();
  },
  { deep: true }
);

const chartData = computed(() => ({
  labels: finance.getChartLabels,
  datasets: [
    {
      data: finance.costs,
      backgroundColor: finance.getChartColors,
      borderWidth: 0,
      borderRadius: 15,
      spacing: 10,
      cutout: "90%",
    },
  ],
}));

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
