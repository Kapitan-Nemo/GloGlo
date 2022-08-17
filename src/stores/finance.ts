import { defineStore } from "pinia";
import { ref } from "vue";
export const useFinanceStore = defineStore(
  "financeStore",
  () => {
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

    const categories = ref<Array<Categories>>([]);
    const records = ref<Array<Records>>([]);
    const chartValues = ref([0]);
    const chartLabels = ref([""]);
    const chartColors = ref([""]);
    return {
      records,
      categories,
      chartValues,
      chartLabels,
      chartColors,
    };
  },
  {
    persist: true,
  }
);
