import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { defineStore } from "pinia";
import { FIREBASE_CONFIG } from "@/utils/const";

export const useFireStore = defineStore("firebaseStore", {
  state: () => {
    return {
      db: getFirestore(initializeApp(FIREBASE_CONFIG)),
    };
  },
});
