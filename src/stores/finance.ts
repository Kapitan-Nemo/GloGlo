import { defineStore } from "pinia";
import { useFireStore } from "@/stores/firestore";
import type { ICategories, INewRecord, IRecords } from "@/utils/interface";

export const useFinanceStore = defineStore("financeStore", {
  state: () => ({
    categories: [] as ICategories[],
    records: [] as IRecords[],
    allRecords: [] as IRecords[],
    allRecordsTemp: [] as IRecords[],
    costs: [] as number[],
    newRecord: {} as INewRecord,
    isLoading: false,
  }),
  getters: {
    getChartColors: (state) => {
      return [
        ...new Map(
          state.records
            .map((data) => data.category.color)
            .map((item) => [item, item])
        ).values(),
      ];
    },
    getChartLabels: (state) => {
      return [
        ...new Map(
          state.records
            .map((data) => data.category.text)
            .map((item) => [item, item])
        ).values(),
      ];
    },
    getFinanceMonth: (state) => {
      const fireStore = useFireStore();
      return state.allRecords
        .filter(
          (n) =>
            n.month == fireStore.dateSelected.month &&
            n.year == fireStore.dateSelected.year
        )
        .reduce(
          (financeMonth: number, record: { cost: number }) =>
            record.cost + financeMonth,
          0
        );
    },
  },

  actions: {
    async fetchRecords() {
      const fireStore = useFireStore();
      this.records = [];
      this.isLoading = true;
      try {
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
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchAllRecords() {
      const fireStore = useFireStore();
      this.allRecordsTemp = [];
      try {
        (await fireStore.allRecords).forEach(async (doc) => {
          const record = {
            id: doc.id,
            cost: doc.data().cost,
            category: doc.data().category,
            editMode: doc.data().editMode,
            month: doc.data().month,
            year: doc.data().year,
          };
          this.allRecordsTemp.push(record);
        });
      } catch (error) {
        console.log(error);
      } finally {
        this.allRecords = this.allRecordsTemp;
      }
    },

    async fetchCategories() {
      const fireStore = useFireStore();
      this.categories = [];
      try {
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
        this.newRecord.category = this.categories[0];
      }
    },
  },
  persist: true,
});
