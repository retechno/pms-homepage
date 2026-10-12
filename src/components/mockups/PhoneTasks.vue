<script setup lang="ts">
/* "My tasks" for a room attendant, on a phone (design reference: KamaraPMS docs/design/5-housekeeping-mobile). Sample data. */
type State = 'dirty' | 'cleaning' | 'clean'
const tasks: { room: string; note: string; state: State; urgent?: boolean }[] = [
  { room: '305', note: 'Arrival 13:00 · Deluxe', state: 'cleaning', urgent: true },
  { room: '201', note: 'Arrival 14:00 · Deluxe', state: 'dirty', urgent: true },
  { room: '204', note: 'Stay-over · do not disturb', state: 'dirty' },
  { room: '310', note: 'Departure · Superior', state: 'dirty' },
  { room: '118', note: 'Done 09:42', state: 'clean' },
]
const label: Record<State, string> = { dirty: 'Dirty', cleaning: 'Cleaning', clean: 'Clean' }
const cls: Record<State, string> = {
  dirty: 'bg-st-dirty-bg text-st-dirty',
  cleaning: 'bg-st-cleaning-bg text-st-cleaning',
  clean: 'bg-st-clean-bg text-st-clean',
}
</script>

<template>
  <div class="mx-auto w-full max-w-[19rem]" role="img" aria-label="Housekeeping tasks on a phone: five rooms, two needed before arrivals, one being cleaned, one done.">
    <div class="rounded-[2.25rem] border border-line-strong bg-ink p-2 shadow-[var(--shadow-frame)]" aria-hidden="true">
      <div class="overflow-hidden rounded-[1.75rem] bg-mist text-[13px]">
        <div class="flex justify-between px-5 pb-1 pt-3 text-[11px] font-semibold text-ink">
          <span class="num">09:48</span><span>Kamara Ubud</span>
        </div>
        <div class="px-4 pb-3 pt-2">
          <p class="text-[18px] font-bold tracking-[-0.01em]">My tasks</p>
          <p class="text-muted">1 of 5 rooms finished</p>
        </div>
        <ul class="space-y-2 px-3 pb-4">
          <li v-for="t in tasks" :key="t.room" class="rounded-xl border border-line bg-paper p-3" :class="t.state === 'clean' ? 'opacity-70' : ''">
            <div class="flex items-center gap-3">
              <span class="num text-[20px] font-bold leading-none tracking-[-0.02em]">{{ t.room }}</span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-[12px]" :class="t.urgent ? 'font-semibold text-st-dirty' : 'text-muted'">{{ t.note }}</p>
              </div>
              <span class="chip" :class="cls[t.state]">{{ label[t.state] }}</span>
            </div>
            <div v-if="t.state === 'cleaning'" class="mt-2.5 grid grid-cols-2 gap-2">
              <span class="rounded-lg border border-line-strong py-2 text-center font-semibold">Skip</span>
              <span class="rounded-lg bg-ledger py-2 text-center font-semibold text-white">Finish</span>
            </div>
            <div v-else-if="t.state === 'dirty' && t.urgent" class="mt-2.5">
              <span class="block rounded-lg bg-ledger py-2 text-center font-semibold text-white">Start</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
