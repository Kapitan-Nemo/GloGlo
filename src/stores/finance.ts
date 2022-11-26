import type { ICategories, IRecords } from "@/utils/interface";
import { defineStore } from "pinia";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as ICategories[],
    records: [] as IRecords[],
    chartValues: [0],
    chartLabels: [],
    chartColors: [],
  }),
  persist: true,
});
