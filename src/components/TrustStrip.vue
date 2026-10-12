<script setup lang="ts">
const points = [
  {
    title: 'Nothing is edited after the fact',
    body: 'Folios and journals only grow. A mistake is corrected with a reversal that needs an approval.',
  },
  {
    title: 'Every change has a name on it',
    body: 'Each change is written to the audit trail in the same transaction as the change itself.',
  },
  {
    title: 'The hotel’s day, not the clock',
    body: 'Charges and reports follow the business date, which only the night audit moves forward.',
  },
  {
    title: 'Staff see only their properties',
    body: 'Roles and permissions are granted per property, down to who may approve a rate override.',
  },
]
</script>

<template>
  <section class="bg-mist" aria-labelledby="trust-title">
    <div class="page pb-16 pt-8 md:pb-20">
      <h2 id="trust-title" class="sr-only">How KamaraPMS keeps your records trustworthy</h2>
      <ul class="grid gap-x-8 gap-y-6 border-t border-line-strong pt-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="p in points" :key="p.title" class="lg:border-l lg:border-line lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
          <p class="font-semibold text-ink">{{ p.title }}</p>
          <p class="mt-1.5 text-[0.9375rem] text-muted">{{ p.body }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
