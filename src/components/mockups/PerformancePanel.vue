<script setup lang="ts">
/* The manager's Performance page (design reference: KamaraPMS docs/design/6-kinerja). Sample data. */
const rows = [
  { k: 'Occupancy', now: '81,4%', prev: '77,9%', d: '+3,5 pt' },
  { k: 'ADR', now: 'Rp 1.250.000', prev: 'Rp 1.199.500', d: '+4,2%' },
  { k: 'RevPAR', now: 'Rp 1.017.500', prev: 'Rp 934.400', d: '+8,9%' },
  { k: 'Room revenue', now: 'Rp 915,8 m', prev: 'Rp 841,0 m', d: '+8,9%' },
]
const occ = [72, 78, 81, 88, 97, 93, 76, 69, 74, 80, 84, 90, 86, 79]
</script>

<template>
  <div class="frame text-[13px]" role="img" aria-label="Performance page: occupancy, ADR, RevPAR and room revenue for the month so far against last month, and occupancy over the last 14 nights.">
    <div class="flex items-center justify-between border-b border-line px-5 py-3" aria-hidden="true">
      <div>
        <p class="text-[15px] font-bold">Performance</p>
        <p class="text-[12px] text-muted">Kamara Ubud · closed business days</p>
      </div>
      <span class="chip bg-mist-2 text-ink-soft">Managers only</span>
    </div>
    <div class="grid gap-6 p-5" aria-hidden="true">
      <table class="w-full whitespace-nowrap">
        <thead>
          <tr class="border-b border-line text-left text-[12px] text-muted">
            <th class="pb-2 font-medium">Month to date</th>
            <th class="pb-2 text-right font-medium">Oct</th>
            <th class="hidden pb-2 text-right font-medium sm:table-cell">Sep</th>
            <th class="pb-2 text-right font-medium">Change</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="r in rows" :key="r.k" class="border-b border-line last:border-b-0">
            <td class="py-2.5 font-semibold">{{ r.k }}</td>
            <td class="num py-2.5 text-right">{{ r.now }}</td>
            <td class="num hidden py-2.5 text-right text-muted sm:table-cell">{{ r.prev }}</td>
            <td class="num py-2.5 text-right font-semibold text-st-clean">{{ r.d }}</td>
          </tr>
        </tbody>
      </table>
      <div>
        <p class="font-semibold">Occupancy, last 14 nights</p>
        <p class="text-[12px] text-muted">Average 81%</p>
        <div class="mt-3 flex h-20 items-end gap-[5px]">
          <div v-for="(v, i) in occ" :key="i" class="flex-1 rounded-t-[3px]" :class="v >= 90 ? 'bg-st-inhouse' : 'bg-st-booked-line'" :style="{ height: v + '%' }" />
        </div>
      </div>
    </div>
  </div>
</template>
