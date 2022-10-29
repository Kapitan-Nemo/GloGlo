import { FIREBASE_CONFIG } from "@/utils/const";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth,
} from "firebase/auth";

const firebaseApp = initializeApp(FIREBASE_CONFIG);

initializeAuth(firebaseApp, {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});
const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.mount("#app");
