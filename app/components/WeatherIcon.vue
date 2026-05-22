<script setup lang="ts">
defineProps<{ icon: string }>()
</script>

<template>
  <img :src="`https://openweathermap.org/img/wn/${icon}@4x.png`" />
</template>
