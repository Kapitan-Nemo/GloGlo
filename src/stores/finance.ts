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
    }
    const categories = ref<Array<Categories>>([]);
    const records = ref<Array<Records>>([]);

    return {
      records,
      categories,
    };
  },
  {
    persist: true,
  }
);
