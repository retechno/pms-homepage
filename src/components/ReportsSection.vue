<script setup lang="ts">
import PerformancePanel from './mockups/PerformancePanel.vue'

const reports = [
  'Daily summary',
  'Revenue by charge code',
  'Tax by tax type',
  'Cashier, by payment method',
  'Occupancy and statistics',
  'In-house, arrivals, departures',
  'Department report',
  'Budget against actual',
]
const properties = [
  { name: 'Kamara Ubud', meta: 'Bali · 100 rooms', current: true },
  { name: 'Kamara Seminyak', meta: 'Bali · 64 rooms' },
  { name: 'Kamara Yogyakarta', meta: 'DIY · 48 rooms' },
]
</script>

<template>
  <section id="reports" class="bg-mist py-20 md:py-28" aria-labelledby="reports-title">
    <div class="page">
      <div class="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div class="lg:col-span-5">
          <p class="t-label text-ledger">Reports</p>
          <h2 id="reports-title" class="t-h2 mt-2 max-w-[20ch]">Yesterday’s numbers are final the moment the night audit closes.</h2>
          <p class="t-lead mt-4 max-w-[46ch] text-ink-soft">
            Reports read closed business days, so the figure a manager sees in the morning is the figure the accountant sees at month end. Every
            report downloads as CSV or PDF, in English or Bahasa Indonesia.
          </p>
          <ul class="mt-7 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
            <li v-for="r in reports" :key="r" class="border-b border-line-strong/70 py-2.5 text-[0.9375rem] text-ink-soft">{{ r }}</li>
          </ul>
        </div>
        <div class="min-w-0 lg:col-span-7">
          <PerformancePanel />
          <p class="t-caption mt-3 text-muted">Sample figures.</p>
        </div>
      </div>

      <!-- Multi-property -->
      <div id="multi-property" class="mt-20 grid gap-10 border-t border-line-strong pt-14 md:grid-cols-12 md:items-center lg:gap-14">
        <div class="md:col-span-6 lg:col-span-5">
          <h3 class="t-h3 text-[1.5rem]">More than one hotel</h3>
          <p class="mt-3 max-w-[46ch] text-ink-soft">
            Each property keeps its own rooms, rates, business date and books. Guest profiles are shared across your properties, and each member of
            staff is given the properties and permissions they need, one property at a time.
          </p>
        </div>
        <div class="md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div class="frame mx-auto max-w-[24rem] p-2 text-[0.9375rem]" role="img" aria-label="Property switcher listing three hotels, with Kamara Ubud selected.">
            <p class="t-caption px-3 pb-1.5 pt-2 text-muted" aria-hidden="true">Switch property</p>
            <ul aria-hidden="true">
              <li
                v-for="p in properties"
                :key="p.name"
                class="flex items-center justify-between rounded-[var(--radius-control)] px-3 py-2.5"
                :class="p.current ? 'bg-ledger-soft' : ''"
              >
                <span>
                  <span class="block font-semibold">{{ p.name }}</span>
                  <span class="t-caption block text-muted">{{ p.meta }}</span>
                </span>
                <svg v-if="p.current" width="18" height="18" viewBox="0 0 20 20" class="text-ledger"><path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" /></svg>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
