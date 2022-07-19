import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { defineStore } from "pinia";

export const useFireStore = defineStore(
  "firebaseStore",
  () => {
    const firebaseApp = initializeApp({
      apiKey: "AIzaSyBc8Z01xjah-F5kpEZxs8jbb-dBBPzq_zI",
      authDomain: "gloglo-c80a6.firebaseapp.com",
      databaseURL:
        "https://gloglo-c80a6-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "gloglo-c80a6",
      storageBucket: "gloglo-c80a6.appspot.com",
      messagingSenderId: "52622645497",
      appId: "1:52622645497:web:6f072f2c53b0c8951faa28",
    });
    const db = getFirestore(firebaseApp);

    return {
      db,
    };
  },
  {
    persist: true,
  }
);
