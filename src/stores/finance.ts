import { defineStore } from "pinia";
import { useFireStore } from "@/stores/firestore";
import type { ICategories, INewRecord, IRecords } from "@/utils/interface";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as ICategories[],
    records: [] as IRecords[],
    costs: [] as number[],
    newRecord: {} as INewRecord,
  }),
  getters: {
    getChartColors: (state) => {
      const arr = state.records.map((data) => data.category.color);
      return [...new Map(arr.map((item) => [item, item])).values()];
    },
    getChartLabels: (state) => {
      const arr = state.records.map((data) => data.category.text);
      return [...new Map(arr.map((item) => [item, item])).values()];
    },
  },

  actions: {
    async fetchRecords() {
      const fireStore = useFireStore();
      this.records = [];
      (await fireStore.records).forEach(async (doc) => {
        const record = {
          id: doc.id,
          cost: doc.data().cost,
          category: doc.data().category,
          editMode: doc.data().editMode,
          month: doc.data().month,
          year: doc.data().year,
        };
        this.records.push(record);
      });
    },
    async fetchCategories() {
      try {
        const fireStore = useFireStore();
        this.categories = [];
        (await fireStore.categories).forEach((doc) => {
          const category = {
            id: doc.id,
            text: doc.data().text,
            color: doc.data().color,
            date: doc.data().date,
          };
          this.categories.push(category);
        });
      } catch (error) {
        console.log(error);
      } finally {
        console.log("finally");
        this.newRecord.category = this.categories[0];
        console.log(this.newRecord.category);
      }
    },
  },
  persist: true,
});
