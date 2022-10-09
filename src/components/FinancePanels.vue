<template>
  <div class="summary">
    <div class="summary__panel">
      <h2 class="summary__title">This Month</h2>

      <p class="summary__cost">{{ financeMonth.toLocaleString() }}$</p>
      <CoinIcon class="summary__icon"></CoinIcon>
    </div>
    <div class="summary__panel">
      <h2 class="summary__title">This Year</h2>
      <p class="summary__cost">{{ financeYear.toLocaleString() }}$</p>
      <BagIcon class="summary__icon"></BagIcon>
    </div>
    <div class="summary__panel">
      <h2 class="summary__title">Overall</h2>
      <p class="summary__cost">{{ financeOverall.toLocaleString() }}$</p>
      <GoldIcon class="summary__icon"></GoldIcon>
    </div>
  </div>
</template>

<script lang="ts" setup>
import CoinIcon from "@/components/icons/IconCoin.vue";
import BagIcon from "@/components/icons/IconBag.vue";
import GoldIcon from "@/components/icons/IconGold.vue";
import { computed } from "vue";
import { useFinanceStore } from "@/stores/finance";
import MyIcon from "@/assets/icons/avatars/avatar-2.svg?component";
const date = new Date();
const currentMonth = date.getMonth();
const currentYear = date.getFullYear();
const finance = useFinanceStore();
const financeMonthFilter = computed(() => {
  return finance.records.filter(
    (n) => n.month == currentMonth && n.year == currentYear
  );
});
const financeYearFilter = computed(() => {
  return finance.records.filter((n) => n.year == currentYear);
});
const financeMonth = computed(() => {
  return financeMonthFilter.value.reduce(
    (financeMonth: number, record: { cost: number }) =>
      record.cost + financeMonth,
    0
  );
});
const financeYear = computed(() => {
  return financeYearFilter.value.reduce(
    (financeYear: number, record: { cost: number }) =>
      record.cost + financeYear,
    0
  );
});
const financeOverall = computed(() => {
  return finance.records.reduce(
    (financeOverall: number, record: { cost: number }) =>
      record.cost + financeOverall,
    0
  );
});
</script>

<style lang="scss">
.summary {
  display: flex;
  &__panel {
    position: relative;
    width: 290px;
    height: 190px;
    padding: 25px;
    margin: 0 25px 25px 0;
    border-radius: 10px;
    background: linear-gradient(
      135deg,
      rgb(30 31 37) 68%,
      rgba(64, 66, 76, 1) 120%
    );
    word-break: break-all;
  }
  &__title {
    font-size: 25px;
    color: $white;
    margin: 0;
  }
  &__cost {
    font-size: 40px;
    color: $white;
    margin: 15px 0 0 0;
  }
  &__icon {
    position: absolute;
    bottom: 15px;
    right: 15px;
  }
}
</style>
