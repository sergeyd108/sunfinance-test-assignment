<script setup lang="ts">
useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: [{ rel: 'icon', href: '/favicon.ico' }],
  htmlAttrs: { lang: 'en' },
})

const title = 'Weather App'
const description = 'Simple Weather App for Sun Finance test assignment.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})
</script>

<template>
  <UApp class="flex h-full flex-col">
    <UHeader :toggle="false" :ui="{ root: 'bg-transparent border-none' }" class="">
      <template #left>
        <AppLogo class="h-6" />
      </template>

      <template #right>
        <TempUnitSwitch />
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain class="-mt-(--ui-header-height) flex flex-1 flex-col">
      <NuxtPage />
    </UMain>
  </UApp>
</template>
