<script setup lang="ts">
import { nextTick, ref } from 'vue'

const audiences = [
  {
    key: 'independent',
    tab: 'Independent and boutique hotels',
    lead: 'One system instead of a PMS, a spreadsheet for the books and a separate tax tool.',
    points: [
      { t: 'A small team covers more', b: 'The Today screen tells reception what to do first, and room attendants work from their phones.' },
      { t: 'Books without re-keying', b: 'The night audit writes the journal, so your accountant starts from posted figures.' },
      { t: 'Tax handled where it is collected', b: 'VAT returns and faktur pajak come from the charges themselves.' },
    ],
  },
  {
    key: 'group',
    tab: 'Groups with several hotels',
    lead: 'Each property runs its own day, and the group sees all of them from one sign-in.',
    points: [
      { t: 'Shared guest profiles', b: 'A returning guest is recognised at every property you run.' },
      { t: 'Access per property', b: 'Staff get only the properties and permissions their job needs.' },
      { t: 'The same chart of accounts', b: 'Every new property starts with the same accounts, departments and charge codes.' },
    ],
  },
  {
    key: 'finance',
    tab: 'Owners and finance teams',
    lead: 'Figures you can trace, from a report line back to the folio it came from.',
    points: [
      { t: 'Corrections leave a trail', b: 'Ledgers only grow; a correction is a reversal that needs an approval and is logged.' },
      { t: 'Receivables and payables in one place', b: 'Company accounts, supplier bills, bank reconciliation and card settlements.' },
      { t: 'Budget against actual', b: 'By department, from an approved budget version.' },
    ],
  },
]

const current = ref(0)
const tabs = ref<HTMLButtonElement[]>([])
function onKey(e: KeyboardEvent) {
  const n = audiences.length
  let next = current.value
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (current.value + 1) % n
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (current.value - 1 + n) % n
  else if (e.key === 'Home') next = 0
  else if (e.key === 'End') next = n - 1
  else return
  e.preventDefault()
  current.value = next
  nextTick(() => tabs.value[next]?.focus())
}
</script>

<template>
  <section id="who" class="py-20 md:py-28" aria-labelledby="who-title">
    <div class="page">
      <h2 id="who-title" class="t-h2 max-w-[24ch]">Built for hotels in Indonesia, from one property to a group.</h2>

      <div role="tablist" aria-label="Who it’s for" class="mt-10 flex flex-col gap-1 border-b border-line sm:flex-row sm:gap-6" @keydown="onKey">
        <button
          v-for="(a, i) in audiences"
          :id="`who-tab-${a.key}`"
          :key="a.key"
          ref="tabs"
          type="button"
          role="tab"
          :aria-selected="current === i"
          aria-controls="who-panel"
          :tabindex="current === i ? 0 : -1"
          class="-mb-px border-b-2 py-3 text-left font-semibold transition-colors"
          :class="current === i ? 'border-ledger text-ink' : 'border-transparent text-muted hover:text-ink'"
          @click="current = i"
        >
          {{ a.tab }}
        </button>
      </div>

      <div id="who-panel" role="tabpanel" :aria-labelledby="`who-tab-${audiences[current]!.key}`" tabindex="0" class="grid gap-8 pt-10 lg:grid-cols-12">
        <p class="t-lead max-w-[34ch] font-medium text-ink lg:col-span-4">{{ audiences[current]!.lead }}</p>
        <dl class="grid gap-6 sm:grid-cols-3 lg:col-span-8">
          <div v-for="p in audiences[current]!.points" :key="p.t">
            <dt class="font-semibold">{{ p.t }}</dt>
            <dd class="mt-1.5 text-[0.9375rem] text-muted">{{ p.b }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>
