<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locales, locale, setLocale } = useI18n()

const currentYear = new Date().getFullYear()

const items = ref<DropdownMenuItem[]>([
  {
    label: 'PT',
    onSelect: (e) => setLocale('pt')
  },
  {
    label: 'EN',
    onSelect: (e) => setLocale('en')
  }
])
</script>

<template>
  <header class="hero">
    <div class="container">
      <div class="hero-top">
        <span class="label">Portifolio, {{ currentYear }}</span>
        <span class="mark">
          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-languages" color="neutral" variant="ghost" />
          </UDropdownMenu>
        </span>
      </div>

      <img class="avatar" src="/img/me.jpg" alt="Foto de perfil de Nathan Miguel" />

      <h1>Nathan Miguel<span class="dot">.</span></h1>

      <p class="role">{{ $t('stack') }}</p>

      <div class="hero-meta">
        <div>
          <span class="label">{{ $t('locale') }}</span>
          <strong>Anápolis, BR</strong>
        </div>
        <div>
          <span class="label">Stacks</span>
          <strong class="flex items-center gap-x-3">
            <Icon name="logos:nodejs-icon" :size="22" />
            <Icon name="logos:java" :size="22" />
            <Icon name="logos:c-sharp" :size="22" />
            <Icon name="logos:c-plusplus" :size="22" />
            <Icon name="logos:rust" :size="22" />
            <Icon name="logos:python" :size="22" />
            <Icon name="logos:postgresql" :size="22" />
          </strong>
        </div>
        <div>
          <span class="label">{{ $t('languages') }}</span>
          <strong>PT, EN</strong>
        </div>
      </div>

      <ULink class="cta" href="#contacts">{{ $t('contact-me') }} →</ULink>

      <p class="thought">
        {{ $t('about') }}
      </p>
    </div>
  </header>
</template>

<style scoped>
* {
  transition: all 200ms ease-out;
}
</style>