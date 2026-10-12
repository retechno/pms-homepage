<script setup lang="ts">
defineProps<{
  id: string
  area: string
  title: string
  intro: string
  points: { title: string; body: string }[]
  reverse?: boolean
}>()
</script>

<template>
  <section :id="id" :aria-labelledby="`${id}-title`" class="py-16 md:py-24">
    <div class="page grid items-center gap-10 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-16">
      <div class="lg:col-span-5" :class="reverse ? 'lg:order-2' : ''">
        <p class="t-label text-ledger">{{ area }}</p>
        <h2 :id="`${id}-title`" class="t-h2 mt-2 max-w-[20ch]">{{ title }}</h2>
        <p class="t-lead mt-4 max-w-[46ch] text-ink-soft">{{ intro }}</p>
      </div>
      <div class="min-w-0 lg:col-span-7" :class="reverse ? 'lg:order-1' : ''">
        <slot />
      </div>
      <dl class="grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
        <div v-for="p in points" :key="p.title">
          <dt class="font-semibold text-ink">{{ p.title }}</dt>
          <dd class="mt-1.5 text-[0.9375rem] text-muted">{{ p.body }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
