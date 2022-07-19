import { defineStore } from "pinia";
import { ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useUserStore = defineStore(
  "userStore",
  () => {
    const auth = getAuth();
    const userName = ref();
    const userId = ref();
    const logged = ref();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        userName.value = user.displayName;
        userId.value = user.uid;
        logged.value = true;
        localStorage.setItem("logged", JSON.stringify(logged.value));
        localStorage.setItem("userId", JSON.stringify(userId.value));
      } else {
        logged.value = false;
        userId.value = "";
        localStorage.setItem("logged", JSON.stringify(logged.value));
        localStorage.setItem("userId", JSON.stringify(userId.value));
      }
    });
    return {
      userName,
      userId,
      logged,
    };
  },
  {
    persist: true,
  }
);
