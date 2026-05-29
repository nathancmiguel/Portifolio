<script setup lang="ts">
import Works from '~/components/Works.vue';

const { locales, locale, setLocale } = useI18n()

</script>

<template>
  <UMain class="min-h-[calc(100vh-97px)]">
    <Header />

    <Works />

    <Contacts />
  </UMain>
</template>