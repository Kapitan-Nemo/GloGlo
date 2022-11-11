import { defineStore } from "pinia";
import { where, collection, query, getDocs } from "@firebase/firestore";

import { useFireStore } from "@/stores/firestore";
import { useUserStore } from "@/stores/auth";

export const useQueryStore = defineStore("queryStore", {
  state: () => {
    return {
      dateSelected: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    };
  },
  getters: {
    testingRecord: async (state) =>
      await getDocs(
        query(
          collection(
            useFireStore().db,
            "users",
            useUserStore().userId,
            "records"
          ),
          where("month", "==", state.dateSelected.month)
        )
      ),
  },
});
