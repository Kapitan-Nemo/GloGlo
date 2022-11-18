import type { ICategories, IRecords } from "@/utils/interface";
import { defineStore } from "pinia";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as ICategories[],
    records: [] as IRecords[],
    chartValues: [],
    chartLabels: [],
    chartColors: [],
  }),
});

// interface Records {
//   id: string;
//   cost: number;
//   month: number;
//   year: number;
//   category: {
//     id: string;
//     text: string;
//     color: string;
//   };
//   editMode: boolean;
// }
// interface Categories {
//   id: string;
//   text: string;
//   color: string;
//   date: number;
// }
