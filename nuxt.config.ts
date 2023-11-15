// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  tailwindcss: {
    exposeConfig: true,
  },
  devtools: { enabled: true },
  css: [
    '~/assets/scss/global.scss',
  ],
})
