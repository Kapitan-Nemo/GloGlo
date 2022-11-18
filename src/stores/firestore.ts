import { defineStore } from "pinia";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "@/utils/const";
import { where, collection, query, getDocs } from "@firebase/firestore";
import { useUserStore } from "@/stores/auth";

export const useFireStore = defineStore("firebaseStore", {
  state: () => {
    return {
      db: getFirestore(initializeApp(FIREBASE_CONFIG)),
      dateSelected: {
        month: new Date().getMonth(),
        year: new Date().getFullYear(),
      },
    };
  },
  getters: {
    records: async (state) =>
      await getDocs(
        query(
          collection(state.db, "users", useUserStore().userId, "records"),
          where("month", "==", state.dateSelected.month)
        )
      ),
  },
});
