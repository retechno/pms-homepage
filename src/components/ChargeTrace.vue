<script setup lang="ts">
import { nextTick, ref } from 'vue'

/*
  One room charge followed through the system. The split is the charge engine's own
  worked example (KamaraPMS docs/architecture/03-financial-engines.md, "Inclusive, tax on
  service") and the accounts are from the default Indonesian chart of accounts.
*/
const steps = [
  {
    key: 'folio',
    title: 'Posted to the guest’s folio',
    where: 'Front office · night audit',
    body: 'The night audit posts each occupied room’s charge for the business date, once. A second posting of the same night is refused.',
  },
  {
    key: 'split',
    title: 'Split by the charge engine',
    where: 'One engine for every charge',
    body: 'The same engine prices reservation estimates, folio charges and adjustments, so tax and service are always computed the same way.',
  },
  {
    key: 'journal',
    title: 'Written to the ledger',
    where: 'Accounting · day-close journal',
    body: 'Closing the day writes one balanced journal, with each revenue line carrying its department.',
  },
  {
    key: 'tax',
    title: 'Counted in the month’s tax return',
    where: 'Tax',
    body: 'The VAT collected is already on the return. If the guest’s company needs a tax invoice, it is issued from the same charge.',
  },
  {
    key: 'report',
    title: 'Read by reports and the budget',
    where: 'Reports · budget',
    body: 'Revenue reports, the department report and budget against actual all read these lines, so they agree with each other.',
  },
] as const

const current = ref(0)
const tabs = ref<HTMLButtonElement[]>([])

function select(i: number, focus = false) {
  current.value = i
  if (focus) nextTick(() => tabs.value[i]?.focus())
}
function onKey(e: KeyboardEvent) {
  const last = steps.length - 1
  const map: Record<string, number> = {
    ArrowDown: current.value === last ? 0 : current.value + 1,
    ArrowRight: current.value === last ? 0 : current.value + 1,
    ArrowUp: current.value === 0 ? last : current.value - 1,
    ArrowLeft: current.value === 0 ? last : current.value - 1,
    Home: 0,
    End: last,
  }
  if (e.key in map) {
    e.preventDefault()
    select(map[e.key]!, true)
  }
}

const split = [
  { label: 'Room', amount: '909.091' },
  { label: 'Service charge 10%', amount: '90.909' },
  { label: 'VAT 11% on room and service', amount: '110.000' },
]
const journal = [
  { acc: '1210', name: 'Guest ledger', dr: '1.110.000', cr: '' },
  { acc: '4110', name: 'Room revenue, transient · Rooms', dr: '', cr: '909.091' },
  { acc: '2430', name: 'Service charge payable', dr: '', cr: '90.909' },
  { acc: '2420', name: 'VAT payable', dr: '', cr: '110.000' },
]
</script>

<template>
  <section id="connected" class="py-20 md:py-28" aria-labelledby="connected-title">
    <div class="page">
      <div class="max-w-[44rem]">
        <p class="t-label text-ledger">How the modules connect</p>
        <h2 id="connected-title" class="t-h2 mt-2">Follow one room charge from the front desk to the tax return.</h2>
        <p class="t-lead mt-4 text-ink-soft">
          A night in room 305, sold at Rp 1.110.000 with service and VAT included. Nobody types it twice, and every step below reads the same
          record.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <!-- Steps -->
        <div role="tablist" aria-label="Steps of one room charge" aria-orientation="vertical" class="relative lg:col-span-5" @keydown="onKey">
          <span class="absolute bottom-6 left-[1.0625rem] top-6 w-px bg-line-strong" aria-hidden="true" />
          <button
            v-for="(s, i) in steps"
            :id="`trace-tab-${s.key}`"
            :key="s.key"
            ref="tabs"
            type="button"
            role="tab"
            :aria-selected="current === i"
            :aria-controls="`trace-panel`"
            :tabindex="current === i ? 0 : -1"
            class="step relative flex w-full items-start gap-4 rounded-[var(--radius-card)] px-1 py-3 text-left"
            :class="{ 'is-current': current === i }"
            @click="select(i)"
          >
            <span class="step-n num relative z-[1] mt-0.5 grid size-[2.125rem] shrink-0 place-items-center rounded-full border text-[0.875rem] font-bold">{{ i + 1 }}</span>
            <span class="min-w-0">
              <span class="block font-semibold text-ink">{{ s.title }}</span>
              <span class="t-caption block text-muted">{{ s.where }}</span>
            </span>
          </button>
        </div>

        <!-- Panel -->
        <div
          id="trace-panel"
          role="tabpanel"
          :aria-labelledby="`trace-tab-${steps[current]!.key}`"
          tabindex="0"
          class="lg:col-span-7"
        >
          <div class="frame">
            <div class="flex items-center justify-between gap-3 border-b border-line bg-mist px-5 py-3">
              <p class="font-semibold">{{ steps[current]!.title }}</p>
              <p class="num t-caption shrink-0 text-muted">Business date 10 Oct</p>
            </div>

            <div class="px-5 py-5 text-[0.9375rem]">
              <Transition name="swap" mode="out-in">
                <!-- 1 Folio -->
                <div v-if="current === 0" key="folio">
                  <p class="t-caption text-muted">Folio of Ayu Pratiwi · room 305</p>
                  <div class="mt-3 flex items-center justify-between gap-4 rounded-[var(--radius-control)] border border-ledger/30 bg-ledger-soft px-4 py-3">
                    <div class="min-w-0">
                      <p class="font-semibold">Room charge, Deluxe</p>
                      <p class="t-caption text-muted">Night of 10 Oct · posted by night audit</p>
                    </div>
                    <p class="num shrink-0 font-bold">Rp 1.110.000</p>
                  </div>
                  <div class="mt-2 flex items-center justify-between gap-4 px-4 py-2 text-muted">
                    <p>Deposit received, card</p>
                    <p class="num">− Rp 500.000</p>
                  </div>
                </div>

                <!-- 2 Split -->
                <div v-else-if="current === 1" key="split">
                  <table class="w-full">
                    <caption class="sr-only">Breakdown of the room charge</caption>
                    <tbody>
                      <tr v-for="r in split" :key="r.label" class="border-b border-line">
                        <th scope="row" class="py-2.5 text-left font-normal">{{ r.label }}</th>
                        <td class="num py-2.5 text-right">{{ r.amount }}</td>
                      </tr>
                      <tr>
                        <th scope="row" class="pt-3 text-left font-semibold">Total charged</th>
                        <td class="num pt-3 text-right font-bold">1.110.000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 3 Journal -->
                <div v-else-if="current === 2" key="journal" class="-mx-1 overflow-x-auto px-1">
                  <table class="w-full min-w-[26rem]">
                    <caption class="sr-only">Journal lines of the room charge</caption>
                    <thead>
                      <tr class="t-caption border-b border-line text-left text-muted">
                        <th scope="col" class="pb-2 font-medium">Account</th>
                        <th scope="col" class="pb-2 text-right font-medium">Debit</th>
                        <th scope="col" class="pb-2 text-right font-medium">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="j in journal" :key="j.acc" class="border-b border-line last:border-b-0">
                        <td class="py-2.5"><span class="num mr-2 text-muted">{{ j.acc }}</span>{{ j.name }}</td>
                        <td class="num py-2.5 text-right">{{ j.dr }}</td>
                        <td class="num py-2.5 text-right">{{ j.cr }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- 4 Tax -->
                <div v-else-if="current === 3" key="tax">
                  <div class="grid gap-3 sm:grid-cols-2">
                    <div class="rounded-[var(--radius-control)] border border-line px-4 py-3">
                      <p class="t-caption text-muted">VAT return, October</p>
                      <p class="mt-1 font-semibold">Output VAT from this charge</p>
                      <p class="num mt-2 text-[1.25rem] font-bold">Rp 110.000</p>
                    </div>
                    <div class="rounded-[var(--radius-control)] border border-dashed border-line-strong px-4 py-3">
                      <p class="t-caption text-muted">When the guest’s company asks</p>
                      <p class="mt-1 font-semibold">Tax invoice (faktur pajak)</p>
                      <p class="mt-2 text-muted">Addressed to the company, ready for export.</p>
                    </div>
                  </div>
                </div>

                <!-- 5 Reports -->
                <div v-else key="report">
                  <p class="t-caption text-muted">Rooms department, October to date (sample)</p>
                  <div class="mt-3 space-y-3">
                    <div>
                      <div class="flex justify-between"><span>Actual room revenue</span><span class="num font-semibold">Rp 412,6 m</span></div>
                      <div class="mt-1.5 h-2 rounded-full bg-mist-2"><div class="h-full w-[86%] rounded-full bg-ledger" /></div>
                    </div>
                    <div>
                      <div class="flex justify-between text-muted"><span>Budget, approved version</span><span class="num">Rp 480,0 m</span></div>
                      <div class="mt-1.5 h-2 rounded-full bg-mist-2"><div class="h-full w-full rounded-full bg-line-strong" /></div>
                    </div>
                  </div>
                </div>
              </Transition>

              <p class="mt-5 border-t border-line pt-4 text-ink-soft">{{ steps[current]!.body }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.step {
  transition: background-color 0.15s;
}
.step:hover {
  background: var(--color-mist);
}
.step-n {
  background: var(--color-paper);
  border-color: var(--color-line-strong);
  color: var(--color-muted);
  transition:
    background-color 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.step.is-current .step-n {
  background: var(--color-ledger);
  border-color: var(--color-ledger);
  color: #fff;
}
.swap-enter-active,
.swap-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(4px);
}
.swap-leave-to {
  opacity: 0;
}
@media (prefers-reduced-motion: reduce) {
  .swap-enter-active,
  .swap-leave-active {
    transition: none;
  }
}
</style>
