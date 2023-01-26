import { defineStore } from "pinia";
import { onSnapshot } from "@firebase/firestore";
import { useFireStore } from "@/stores/firestore";
import type { ICategories, IRecords, IGroupRecords } from "@/utils/interface";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as ICategories[],
    records: [] as IRecords[],
    groupRecords: [] as IGroupRecords[],
    chartLabels: [""],
    chartColors: [""],
    chartCosts: [0],
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
    // getChartCosts: (state) => {
    //   console.log("Odpalam finance Costs");
    //   const categoriesCost = (item: ICategories) => {
    //     state.chartCosts.push(
    //       state.records
    //         .filter((element) => element.category.text == item.text)
    //         .map((data) => data.cost)
    //         .reduce((a, b) => a + b, 0)
    //     );
    //   };
    //   // Filter duplicate Categories
    //   const searchCategories = [
    //     ...new Map(
    //       state.records
    //         .map((data) => data.category)
    //         .map((item) => [item.id, item])
    //     ).values(),
    //   ];
    //   const test = searchCategories.forEach(categoriesCost);
    //   return test;
    // },
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
      const fireStore = useFireStore();
      this.categories = [];
      onSnapshot(fireStore.categories, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const category = {
            id: doc.id,
            text: doc.data().text,
            color: doc.data().color,
            date: doc.data().date,
          };
          this.categories.push(category);
        });
      });
    },
    async fetchGroupRecords() {
      console.log("fetchGroupRecords");
    },
  },
  persist: true,
});
