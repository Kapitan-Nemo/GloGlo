import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { FIREBASE_CONFIG } from '@/utils/constants'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import {
  browserLocalPersistence,
  browserPopupRedirectResolver,
  initializeAuth
} from 'firebase/auth'

initializeAuth(initializeApp(FIREBASE_CONFIG), {
  persistence: browserLocalPersistence,
  popupRedirectResolver: browserPopupRedirectResolver
})
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(router)
app.use(pinia)
app.mount('#app')
