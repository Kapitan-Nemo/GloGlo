<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useFinanceStore } from "@/stores/finance";

import month from "@/assets/icons/cards/month.svg?component";
import year from "@/assets/icons/cards/year.svg?component";
import overall from "@/assets/icons/cards/overall.svg?component";
import { collection, getDocs, query } from "@firebase/firestore";
import { useFireStore } from "@/stores/firestore";
import { useUserStore } from "@/stores/auth";
import type { IRecords } from "@/utils/interface";
import { storeToRefs } from "pinia";

const finance = useFinanceStore();
const firestore = useFireStore();
const { dateSelected } = storeToRefs(firestore);
const allRecords = ref([] as IRecords[]); //TODO: move to pinia store

const financeMonth = computed(() => {
  return allRecords.value
    .filter(
      (n) =>
        n.month == dateSelected.value.month && n.year == dateSelected.value.year
    )
    .reduce(
      (financeMonth: number, record: { cost: number }) =>
        record.cost + financeMonth,
      0
    );
});

const financeYear = computed(() => {
  return allRecords.value
    .filter((n) => n.year == dateSelected.value.year)
    .reduce(
      (financeYear: number, record: { cost: number }) =>
        record.cost + financeYear,
      0
    );
});
const financeOverall = computed(() => {
  return allRecords.value.reduce(
    (financeOverall: number, record: { cost: number }) =>
      record.cost + financeOverall,
    0
  );
});

watch(
  () => finance.records,
  () => {
    setTimeout(() => {
      fetchAllRecords();
    }, 100);
    //TODO: Improve watcher
  }
);

const fetchAllRecords = async () => {
  allRecords.value = [];
  try {
    (
      await getDocs(
        query(
          collection(firestore.db, "users", useUserStore().userId, "records")
        )
      )
    ).forEach(async (doc) => {
      const record = {
        id: doc.id,
        cost: doc.data().cost,
        category: doc.data().category,
        editMode: doc.data().editMode,
        month: doc.data().month,
        year: doc.data().year,
      };
      allRecords.value.push(record);
    });
  } catch (error) {
    console.log(error);
  } finally {
    console.log("odpalam finally");
  }
};

onMounted(() => {
  fetchAllRecords();
});
</script>

<template>
  <div class="summary">
    <div class="summary__panel">
      <h2 class="summary__title">This Month</h2>

      <p class="summary__cost">{{ financeMonth.toLocaleString() }}$</p>
      <month class="summary__icon"></month>
    </div>
    <div class="summary__panel">
      <h2 class="summary__title">This Year</h2>
      <p class="summary__cost">{{ financeYear.toLocaleString() }}$</p>
      <year class="summary__icon"></year>
    </div>
    <div class="summary__panel">
      <h2 class="summary__title">Overall</h2>
      <p class="summary__cost">{{ financeOverall.toLocaleString() }}$</p>
      <overall class="summary__icon"></overall>
    </div>
  </div>
</template>

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
