<script setup lang="ts">
/* A slice of the tape chart: rooms down the side, nights across. Sample data. */
const nights = ['Sat 10', 'Sun 11', 'Mon 12', 'Tue 13', 'Wed 14', 'Thu 15', 'Fri 16', 'Sat 17']
type Kind = 'inhouse' | 'booked' | 'ooo'
const rooms: { no: string; type: string; stays: { from: number; to: number; who: string; kind: Kind }[] }[] = [
  { no: '201', type: 'DLX', stays: [{ from: 0, to: 3, who: 'J. Walker', kind: 'inhouse' }, { from: 3, to: 6, who: 'A. Pratiwi', kind: 'booked' }] },
  { no: '202', type: 'DLX', stays: [{ from: 1, to: 4, who: 'D. Hartono', kind: 'booked' }, { from: 5, to: 8, who: 'S. Lim', kind: 'booked' }] },
  { no: '203', type: 'SUP', stays: [{ from: 0, to: 2, who: 'B. Santoso', kind: 'inhouse' }, { from: 2, to: 7, who: 'PT Nusa Wisata', kind: 'booked' }] },
  { no: '204', type: 'SUP', stays: [{ from: 0, to: 8, who: 'Out of order, bathroom', kind: 'ooo' }] },
  { no: '205', type: 'FAM', stays: [{ from: 0, to: 5, who: 'Tan family', kind: 'inhouse' }] },
  { no: '206', type: 'FAM', stays: [{ from: 3, to: 5, who: 'M. Wirawan', kind: 'booked' }, { from: 6, to: 8, who: 'R. Kusuma', kind: 'booked' }] },
]
const n = nights.length
const kindClass: Record<Kind, string> = {
  inhouse: 'bg-st-inhouse text-white',
  booked: 'bg-st-booked-bg text-st-booked border border-st-booked-line',
  ooo: 'ooo text-white',
}
</script>

<template>
  <div class="frame text-[12px]" role="img" aria-label="Tape chart: six rooms across eight nights, with in-house stays, upcoming bookings and one room out of order.">
    <div class="flex items-center justify-between border-b border-line px-4 py-2.5" aria-hidden="true">
      <p class="text-[13px] font-semibold">Tape chart</p>
      <div class="flex items-center gap-3 text-muted">
        <span class="inline-flex items-center gap-1.5"><i class="size-2.5 rounded-[3px] bg-st-inhouse" />In house</span>
        <span class="inline-flex items-center gap-1.5"><i class="size-2.5 rounded-[3px] border border-st-booked-line bg-st-booked-bg" />Booked</span>
      </div>
    </div>
    <div class="px-3 pb-3 pt-2" aria-hidden="true">
      <div class="grid grid-cols-[3.25rem_1fr] items-end">
        <span />
        <div class="grid" :style="{ gridTemplateColumns: `repeat(${n}, 1fr)` }">
          <span v-for="(d, i) in nights" :key="d" class="num truncate pb-1.5 text-center text-[11px]" :class="i === 0 ? 'font-bold text-ink' : 'text-muted'"
            ><span class="sm:hidden">{{ d.split(' ')[1] }}</span><span class="hidden sm:inline">{{ d }}</span></span
          >
        </div>
      </div>
      <div v-for="r in rooms" :key="r.no" class="grid grid-cols-[3.25rem_1fr] items-center border-t border-line">
        <p class="num py-2 font-semibold">
          {{ r.no }}<span class="ml-1 text-[10px] font-medium text-muted">{{ r.type }}</span>
        </p>
        <div class="lanes relative h-9" :style="{ '--n': n }">
          <div
            v-for="s in r.stays"
            :key="s.who"
            class="absolute top-1.5 bottom-1.5 flex items-center overflow-hidden rounded-[5px] px-2 font-semibold"
            :class="kindClass[s.kind]"
            :style="{ left: `calc(${(s.from / n) * 100}% + 2px)`, width: `calc(${((s.to - s.from) / n) * 100}% - 4px)` }"
          >
            <span class="truncate">{{ s.who }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lanes {
  background-image: linear-gradient(to right, var(--color-line) 1px, transparent 1px);
  background-size: calc(100% / var(--n)) 100%;
}
.ooo {
  background: repeating-linear-gradient(135deg, #4a5361 0 6px, #59636f 6px 12px);
}
</style>
