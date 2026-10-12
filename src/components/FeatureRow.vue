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
    <div class="page grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
      <div class="lg:col-span-5" :class="reverse ? 'lg:order-2' : ''">
        <p class="t-label text-ledger">{{ area }}</p>
        <h2 :id="`${id}-title`" class="t-h2 mt-2 max-w-[20ch]">{{ title }}</h2>
        <p class="t-lead mt-4 max-w-[46ch] text-ink-soft">{{ intro }}</p>
        <dl class="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          <div v-for="p in points" :key="p.title" class="border-l-2 border-ledger-soft pl-4">
            <dt class="font-semibold text-ink">{{ p.title }}</dt>
            <dd class="mt-1 text-[0.9375rem] text-muted">{{ p.body }}</dd>
          </div>
        </dl>
      </div>
      <div class="min-w-0 lg:col-span-7" :class="reverse ? 'lg:order-1' : ''">
        <slot />
      </div>
    </div>
  </section>
</template>
