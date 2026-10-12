<script setup lang="ts">
const groups = [
  {
    title: 'General ledger',
    body: 'A USALI chart of accounts, set up in Indonesian for a new property. The night audit writes the day’s journal by department. Trial balance, income statement, balance sheet and cash flow, direct or indirect.',
  },
  {
    title: 'Company accounts',
    body: 'City ledger invoices and receipts, credit notes and write-offs, overdue lists, reminders and late fees.',
  },
  {
    title: 'Suppliers',
    body: 'Bills with their input VAT, payments, supplier credit notes and an aging report.',
  },
  {
    title: 'Cash and bank',
    body: 'Cashier shifts with handover and X and Z reports. Bank statement import and reconciliation, card settlements with the commission and its VAT.',
  },
  {
    title: 'Tax',
    body: 'Monthly returns of the taxes you collected, input VAT and credit carried forward, PKP status, and tax invoices (faktur pajak) ready to export.',
  },
  {
    title: 'Budget',
    body: 'Budget versions with approval, by department, filled from actual figures and compared against them as the year runs.',
  },
]
</script>

<template>
  <section id="accounting" class="bg-pine text-white" aria-labelledby="accounting-title">
    <div class="page py-20 md:py-28">
      <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-7">
          <p class="t-label text-ledger-bright">Accounting and tax</p>
          <h2 id="accounting-title" class="t-h2 mt-2 max-w-[22ch]">Your accountant works in the same system as your front desk.</h2>
        </div>
        <p class="t-lead max-w-[44ch] text-pine-text lg:col-span-5">
          There is no export to a separate accounting package and no month-end re-keying. The figures the front desk posts are the figures in your
          books and your tax return.
        </p>
      </div>

      <dl class="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="g in groups" :key="g.title" class="border-t border-pine-line pt-6">
          <dt class="text-[1.0625rem] font-semibold">{{ g.title }}</dt>
          <dd class="mt-2 text-[0.9375rem] leading-relaxed text-pine-text">{{ g.body }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
