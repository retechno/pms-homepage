<script setup lang="ts">
const planned = [
  {
    title: 'Point of sale',
    body: 'Restaurant, bar and spa sales charged to a room or paid on the spot, posting to the folio through the same charge engine.',
  },
  {
    title: 'Inventory and purchasing',
    body: 'Stock, purchase orders and goods received, with supplier bills going to the payables module that exists today.',
  },
  {
    title: 'Banquet and events',
    body: 'Function bookings, event orders and billing. The default chart of accounts already has the banquet revenue accounts.',
  },
]
</script>

<template>
  <section id="roadmap" class="py-16 md:py-20" aria-labelledby="roadmap-title">
    <div class="page">
      <div class="grid gap-6 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <h2 id="roadmap-title" class="t-h3 text-[1.5rem]">On the roadmap</h2>
          <p class="mt-3 max-w-[40ch] text-ink-soft">
            These modules are planned and not available yet. Ask us about timing when you book a demo.
          </p>
        </div>
        <ul class="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          <li v-for="p in planned" :key="p.title" class="rounded-[var(--radius-card)] border border-dashed border-line-strong p-5">
            <span class="state-tag state-planned">Planned</span>
            <p class="mt-3 font-semibold">{{ p.title }}</p>
            <p class="mt-1.5 text-[0.9375rem] text-muted">{{ p.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
