<script setup lang="ts">
/*
  The "Today" home screen of KamaraPMS (design reference: KamaraPMS docs/design/3-beranda).
  Sample data only.
*/
type Readiness = 'ready' | 'clean' | 'dirty' | 'none'

const arrivals: { name: string; meta: string; state: string; k: Readiness }[] = [
  { name: 'Ayu Pratiwi', meta: '305 · Deluxe · ETA 13:00', state: 'Dirty', k: 'dirty' },
  { name: 'Daniel Hartono', meta: '210 · Superior · 3 nights', state: 'Ready', k: 'ready' },
  { name: 'PT Nusa Wisata group', meta: '6 rooms · Standard', state: '4 of 6 ready', k: 'clean' },
  { name: 'Made Wirawan', meta: 'No room yet · Family', state: 'Assign', k: 'none' },
  { name: 'Sarah Lim', meta: '118 · Standard · 1 night', state: 'Ready', k: 'ready' },
]
const departures = [
  { name: 'Budi Santoso', meta: '402 · Superior', balance: 'Rp 0' },
  { name: 'Tan family', meta: '220 + 221 · Family', balance: 'Rp 3.450.000' },
  { name: 'Rina Kusuma', meta: '115 · corporate', balance: 'City ledger' },
]
const attention = [
  { n: 5, title: 'Dirty rooms for arrivals before 14:00', sub: '201, 204, 305, 310, 412' },
  { n: 3, title: 'Folios over their credit limit', sub: 'Ask for a deposit first' },
  { n: 2, title: 'Arrivals without a room number', sub: 'Deluxe and Family' },
]
const occ = [78, 82, 91, 96, 74, 63, 58, 61, 70, 88, 94, 99, 72, 60]
const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const chip: Record<Readiness, string> = {
  ready: 'bg-st-clean text-white',
  clean: 'bg-st-clean-bg text-st-clean',
  dirty: 'bg-st-dirty-bg text-st-dirty',
  none: 'bg-st-booked-bg text-st-booked',
}
const nav = ['Today', 'Room status', 'Tape chart', 'Cashier', 'Performance']
</script>

<template>
  <div class="frame text-[13px] leading-[1.45] text-ink" role="img" aria-label="The KamaraPMS Today screen: occupancy, arrivals, departures, rooms ready to sell, items that need attention and the next 14 nights.">
    <!-- Window bar -->
    <div class="flex items-center gap-3 border-b border-line bg-mist px-4 py-2.5" aria-hidden="true">
      <span class="flex gap-1.5"><i class="dot" /><i class="dot" /><i class="dot" /></span>
      <span class="num ml-2 truncate text-[12px] text-muted">Kamara Ubud · business date Sat 10 Oct · night audit from 23:00</span>
    </div>

    <div class="flex" aria-hidden="true">
      <!-- Sidebar -->
      <aside class="hidden w-44 shrink-0 border-r border-line bg-mist/60 p-3 xl:block">
        <p class="px-2 pb-2 pt-1 text-[11px] font-semibold text-muted">Pinned</p>
        <ul class="space-y-0.5">
          <li
            v-for="(item, i) in nav"
            :key="item"
            class="flex items-center justify-between rounded-md px-2 py-1.5"
            :class="i === 0 ? 'bg-paper font-semibold text-ledger shadow-[var(--shadow-lift)]' : 'text-ink-soft'"
          >
            {{ item }}<span v-if="i === 1" class="num text-[11px] text-muted">14</span>
          </li>
        </ul>
        <p class="mt-5 px-2 pb-2 text-[11px] font-semibold text-muted">All menus</p>
        <ul class="space-y-0.5 text-ink-soft">
          <li class="px-2 py-1.5">Front office</li>
          <li class="px-2 py-1.5">Rooms and housekeeping</li>
          <li class="px-2 py-1.5">Billing</li>
          <li class="px-2 py-1.5">Finance</li>
        </ul>
      </aside>

      <!-- Content -->
      <div class="min-w-0 flex-1 p-4 sm:p-5">
        <div class="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p class="text-[17px] font-bold tracking-[-0.01em]">Good morning, Khalil</p>
            <p class="text-muted">12 arrivals, 8 departures, 14 rooms still dirty.</p>
          </div>
          <div class="hidden gap-2 sm:flex">
            <span class="rounded-md border border-line-strong px-2.5 py-1.5 font-semibold">Walk-in</span>
            <span class="rounded-md bg-ledger px-2.5 py-1.5 font-semibold text-white">New reservation</span>
          </div>
        </div>

        <!-- Figures -->
        <div class="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-4">
          <div class="tile">
            <p class="tile-l">Occupancy tonight</p>
            <p class="tile-n num">78%</p>
            <div class="mt-1.5 h-1.5 overflow-hidden rounded-full bg-mist-2"><div class="h-full w-[78%] rounded-full bg-ledger" /></div>
          </div>
          <div class="tile">
            <p class="tile-l">Arrivals</p>
            <p class="tile-n num">12<span class="tile-of">/ 20</span></p>
            <p class="tile-s">8 checked in</p>
          </div>
          <div class="tile">
            <p class="tile-l">Departures</p>
            <p class="tile-n num">8<span class="tile-of">/ 15</span></p>
            <p class="tile-s">7 checked out</p>
          </div>
          <div class="tile">
            <p class="tile-l">Ready to sell</p>
            <p class="tile-n num">30</p>
            <p class="tile-s"><span class="text-st-dirty">14 dirty</span> · 6 cleaning</p>
          </div>
        </div>

        <div class="mt-3 grid gap-2.5 md:grid-cols-[1.25fr_1fr]">
          <!-- Arrivals -->
          <div class="rounded-[var(--radius-card)] border border-line">
            <div class="flex items-center justify-between border-b border-line px-3 py-2">
              <p class="font-semibold">Arrivals <span class="font-normal text-muted">· 12 to go</span></p>
              <p class="text-[12px] font-semibold text-ledger">All</p>
            </div>
            <ul>
              <li v-for="a in arrivals" :key="a.name" class="flex items-center gap-3 border-b border-line px-3 py-2 last:border-b-0">
                <div class="min-w-0 flex-1">
                  <p class="truncate font-semibold">{{ a.name }}</p>
                  <p class="num truncate text-[12px] text-muted">{{ a.meta }}</p>
                </div>
                <span class="chip" :class="chip[a.k]">{{ a.state }}</span>
                <span class="hidden rounded-md border border-line-strong px-2 py-1 text-[12px] font-semibold lg:inline">Check in</span>
              </li>
            </ul>
          </div>

          <!-- Departures + attention -->
          <div class="hidden gap-2.5 sm:grid">
            <div class="rounded-[var(--radius-card)] border border-line">
              <div class="border-b border-line px-3 py-2"><p class="font-semibold">Departures <span class="font-normal text-muted">· 8 to go</span></p></div>
              <ul>
                <li v-for="d in departures" :key="d.name" class="flex items-center justify-between gap-3 border-b border-line px-3 py-2 last:border-b-0">
                  <div class="min-w-0">
                    <p class="truncate font-semibold">{{ d.name }}</p>
                    <p class="truncate text-[12px] text-muted">{{ d.meta }}</p>
                  </div>
                  <p class="num shrink-0 text-[12px] font-semibold" :class="d.balance === 'Rp 0' ? 'text-muted' : 'text-ink'">{{ d.balance }}</p>
                </li>
              </ul>
            </div>
            <div class="rounded-[var(--radius-card)] border border-line bg-st-noshow-bg/50 px-3 py-2">
              <p class="font-semibold">Needs attention</p>
              <ul class="mt-1 space-y-1.5">
                <li v-for="item in attention" :key="item.title" class="flex gap-2.5">
                  <span class="num w-4 shrink-0 text-right font-bold text-st-noshow">{{ item.n }}</span>
                  <span class="min-w-0"><span class="block truncate">{{ item.title }}</span></span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Next 14 nights -->
        <div class="mt-3 hidden rounded-[var(--radius-card)] border border-line px-3 pb-2 pt-2.5 md:block">
          <div class="flex items-baseline justify-between">
            <p class="font-semibold">Next 14 nights <span class="font-normal text-muted">· rooms booked</span></p>
            <p class="text-[11px] text-muted">lines at 50% and 100%</p>
          </div>
          <div class="relative mt-2 h-[92px]">
            <div class="absolute inset-x-0 top-0 border-t border-dashed border-line-strong" />
            <div class="absolute inset-x-0 top-1/2 border-t border-dashed border-line" />
            <div class="relative flex h-full items-end gap-[6px]">
              <div v-for="(v, i) in occ" :key="i" class="flex h-full flex-1 flex-col justify-end">
                <div
                  class="bar rounded-t-[3px]"
                  :style="{ height: v + '%', animationDelay: 80 + i * 35 + 'ms' }"
                  :class="i === 0 ? 'bg-ledger' : v >= 90 ? 'bg-st-inhouse' : 'bg-st-booked-line'"
                />
              </div>
            </div>
          </div>
          <div class="mt-1 flex gap-[6px]">
            <span v-for="(d, i) in days" :key="i" class="flex-1 text-center text-[10px]" :class="i === 0 ? 'font-bold text-ink' : 'text-muted'">{{ d }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--color-line-strong);
}
.tile {
  border: 1px solid var(--color-line);
  border-radius: var(--radius-card);
  padding: 0.625rem 0.75rem;
}
.tile-l {
  font-size: 12px;
  color: var(--color-muted);
}
.tile-n {
  margin-top: 0.125rem;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.15;
}
.tile-of {
  margin-left: 0.25rem;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-muted);
}
.tile-s {
  margin-top: 0.25rem;
  font-size: 12px;
  color: var(--color-muted);
}
.bar {
  transform-origin: bottom;
  animation: grow 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) both;
}
@keyframes grow {
  from {
    transform: scaleY(0.04);
  }
  to {
    transform: scaleY(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .bar {
    animation: none;
  }
}
</style>
