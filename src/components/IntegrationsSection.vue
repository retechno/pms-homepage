<script setup lang="ts">
const today = [
  { title: 'Bank statements', body: 'Import a statement file and match its lines to payments, receipts and card settlements.' },
  { title: 'Tax invoices', body: 'Export faktur pajak for your tax filing.' },
  { title: 'Reports', body: 'Every report as CSV for spreadsheets, or as PDF.' },
  { title: 'Guest e-mail', body: 'Booking confirmations sent from the reservation.' },
]
const planned = [
  { title: 'Channel manager and booking engine', body: 'Online bookings arrive as reservations from OTA or website, and your sales restrictions are already kept in the format a channel manager reads.' },
  { title: 'Payment gateway', body: 'Online payments recorded against the folio as ordinary payments.' },
  { title: 'Point of sale', body: 'Outlet sales posted to the guest’s folio, with their tax checked by the charge engine.' },
  { title: 'Door locks, PABX and IPTV', body: 'Check-in, room moves and check-out sent to the systems in the room.' },
]
</script>

<template>
  <section id="integrations" class="border-t border-line bg-mist py-20 md:py-28" aria-labelledby="integrations-title">
    <div class="page">
      <div class="max-w-[44rem]">
        <p class="t-label text-ledger">Integrations</p>
        <h2 id="integrations-title" class="t-h2 mt-2">What connects today, and what comes next.</h2>
        <p class="t-lead mt-4 text-ink-soft">
          Today KamaraPMS exchanges files and e-mail. Live connections to other systems are planned, and the system already has the place where
          each of them will plug in.
        </p>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <div class="frame p-6 md:p-8">
          <div class="flex items-center justify-between gap-4">
            <h3 class="t-h3">Works today</h3>
            <span class="state-tag state-live"><i class="size-1.5 rounded-full bg-current" />Available</span>
          </div>
          <dl class="mt-5">
            <div v-for="i in today" :key="i.title" class="border-t border-line py-4">
              <dt class="font-semibold">{{ i.title }}</dt>
              <dd class="mt-1 text-[0.9375rem] text-muted">{{ i.body }}</dd>
            </div>
          </dl>
        </div>
        <div class="rounded-[var(--radius-frame)] border border-dashed border-line-strong p-6 md:p-8">
          <div class="flex items-center justify-between gap-4">
            <h3 class="t-h3">Planned connections</h3>
            <span class="state-tag state-planned">Planned</span>
          </div>
          <dl class="mt-5">
            <div v-for="i in planned" :key="i.title" class="border-t border-line-strong/70 py-4">
              <dt class="font-semibold">{{ i.title }}</dt>
              <dd class="mt-1 text-[0.9375rem] text-muted">{{ i.body }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>
</template>
