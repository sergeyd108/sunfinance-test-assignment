// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: ['@nuxt/eslint', '@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt'],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2025-01-15',

  runtimeConfig: {
    public: {
      openWeatherAppId: '',
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        plugins: [{ name: '@vue/typescript-plugin' }],
      },
    },
  },
})
