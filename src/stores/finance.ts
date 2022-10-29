import { defineStore } from "pinia";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as Categories[],
    records: [] as Records[],
    chartValues: [],
    chartLabels: [],
    chartColors: [],
  }),
  persist: true,
});

interface Records {
  id: string;
  cost: number;
  month: number;
  year: number;
  category: {
    text: string;
    id: string;
    color: string;
  };
  editMode: boolean;
}
interface Categories {
  text: string;
  color: string;
  id: string;
  total: number;
  date: number;
}
