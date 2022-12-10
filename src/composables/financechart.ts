import { computed } from "vue";
import { useFinanceStore } from "@/stores/finance";
const finance = useFinanceStore();

export function financeChart() {
  const financeLabels = computed(() => {
    return finance.categories.map((data) => data.text);
  });
  const financeColor = computed(() => {
    return finance.categories.map((data) => data.color);
  });
  // const financeTotal = computed(() => {
  //   return finance.categories.map((data) => data.total);
  // });
  setTimeout(() => {
    // finance.chartColors = financeColor.value;
    // finance.chartLabels = financeLabels.value;
    // finance.chartValues = financeTotal.value;
    // console.log(finance.chartValues);
  }, 500);
}
