// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'],
  tailwindcss: {
    exposeConfig: true,
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
      FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
      FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
      FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET,
      FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID,
      FIREBASE_APPID: process.env.FIREBASE_APPID,
      FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID,
      FIREBASE_ADMINID: process.env.FIREBASE_ADMINID,
      STRIPE_PK: process.env.STRIPE_PK,
    },
  },
  routeRules: {
    // Homepage pre-rendered at build time
    '/': { prerender: true },
    // Admin dashboard renders only on client-side
    '/admin/**': { ssr: false },
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },
  imports: {
    dirs: ['./stores'],
  },
  components: [
    { path: '~/components/admin', prefix: 'Admin' },
    '~/components',
  ],
  css: [
    '~/assets/scss/global.scss',
  ],
})
