<script setup lang="ts">
import type { ModalProps } from '@nuxt/ui'
import ForecastWidget from '~/features/forecast/ForecastWidget.vue'
import { Coordinates } from '~/value-objects/Coordinates'

definePageMeta({ middleware: ['weather'] })

type Props = Omit</* @vue-ignore */ ModalProps, 'description'>

interface Emits {
  close: []
}

defineProps<Props>()
defineEmits<Emits>()

const route = useRoute()

const lat = computed(() => +(route.query.lat ?? ''))
const lon = computed(() => +(route.query.lon ?? ''))
const coords = computed(() => new Coordinates(lat.value, lon.value))
</script>

<template>
  <UModal
    :ui="{
      description: 'hidden',
      content: 'rounded-xl shadow-md max-w-sm desktop:max-w-lg',
    }"
    :dismissible="false"
    default-open
  >
    <template #description />
    <template #content>
      <ForecastWidget :coords />
      <UButton
        icon="i-lucide-x"
        size="sm"
        variant="ghost"
        color="neutral"
        class="absolute top-2 right-2"
        aria-label="Close"
        @click="$router.push('/')"
      />
    </template>
  </UModal>
</template>
