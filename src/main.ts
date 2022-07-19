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
