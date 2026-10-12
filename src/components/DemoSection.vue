<script setup lang="ts">
import DemoForm from './DemoForm.vue'
import { site } from '@/site.config'

const agenda = [
  'A day at the front desk on the Today screen, from arrivals to check-out',
  'The night audit closing a business day, and the journal it writes',
  'Your tax: VAT returns, input VAT and faktur pajak',
  'What setting up your property involves',
]
</script>

<template>
  <section id="demo" class="bg-pine text-white" aria-labelledby="demo-title">
    <div class="page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-14">
      <div class="lg:col-span-5">
        <h2 id="demo-title" class="t-h2 max-w-[18ch]">See a full hotel day in KamaraPMS.</h2>
        <p class="t-lead mt-4 max-w-[42ch] text-pine-text">
          Tell us about your hotel and we will arrange a time to walk you through it. A demo covers:
        </p>
        <ul class="mt-6 space-y-3">
          <li v-for="a in agenda" :key="a" class="flex gap-3 text-[0.9375rem] text-pine-text">
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" class="mt-[3px] shrink-0 text-ledger-bright">
              <path d="M4 10.5l4 4 8-9" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>{{ a }}</span>
          </li>
        </ul>
      </div>
      <div class="min-w-0 lg:col-span-7">
        <DemoForm :site="site" />
      </div>
    </div>
  </section>
</template>
