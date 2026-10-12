<script setup lang="ts">
const faqs = [
  {
    q: 'What is included today?',
    a: 'Reservations and rates, the front desk, housekeeping, maintenance and lost and found, folios and the cashier, the night audit, the general ledger, company accounts, supplier bills, bank reconciliation, tax returns and tax invoices, budgets and reports. Point of sale, inventory and banquet are planned and not available yet.',
  },
  {
    q: 'Can we run more than one hotel?',
    a: 'Yes. Each property has its own rooms, rates, business date and books. Guest profiles are shared across your properties, and staff are given access one property at a time.',
  },
  {
    q: 'How does onboarding work?',
    a: 'A new property starts with an Indonesian chart of accounts of 199 accounts, 8 departments and 10 charge codes, which you can adjust. Your rooms, room types, rates and users are set up on top of that. In the demo we go through what that involves for your property.',
  },
  {
    q: 'Which other systems does it connect to?',
    a: 'Today it imports bank statements, exports tax invoices and reports, and sends booking confirmations by e-mail. Channel managers, payment gateways, point of sale, door locks, PABX and IPTV are planned; see the integrations section above.',
  },
  {
    q: 'How is our data protected?',
    a: 'Sign-in sessions are short-lived and every request is checked against the session, so signing out or deactivating a user takes effect at once. Staff only see the properties and actions they are given. Folios and journals cannot be edited after posting, and every change is recorded in the audit trail with who made it. Ask us in the demo about hosting and backups for your installation.',
  },
  {
    q: 'Does it work in Bahasa Indonesia?',
    a: 'Yes. Screens, printed documents, PDF and CSV reports and error messages are available in Bahasa Indonesia and English.',
  },
  {
    q: 'How does the subscription work?',
    a: 'Pricing is not published yet. Book a demo and we will send you a quote for your hotel.',
  },
]
</script>

<template>
  <section id="pricing" class="border-t border-line py-20 md:py-24" aria-labelledby="pricing-title">
    <div class="page grid gap-6 md:grid-cols-12 md:items-center">
      <div class="md:col-span-7">
        <h2 id="pricing-title" class="t-h2">Pricing</h2>
        <p class="t-lead mt-4 max-w-[48ch] text-ink-soft">
          Pricing is not published yet. Tell us about your hotel in a demo and we will send you a quote that covers the properties and modules you
          need.
        </p>
      </div>
      <div class="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
        <a href="#demo" class="btn btn-primary">Request a quote</a>
      </div>
    </div>
  </section>

  <section id="faq" class="bg-mist py-20 md:py-28" aria-labelledby="faq-title">
    <div class="page grid gap-10 lg:grid-cols-12">
      <div class="lg:col-span-4">
        <h2 id="faq-title" class="t-h2">Common questions</h2>
      </div>
      <div class="lg:col-span-8">
        <details v-for="f in faqs" :key="f.q" class="faq group border-b border-line-strong/70 first:border-t">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.0625rem] font-semibold">
            {{ f.q }}
            <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" class="shrink-0 text-muted transition-transform group-open:rotate-45">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </summary>
          <p class="max-w-[62ch] pb-6 text-ink-soft">{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq summary::-webkit-details-marker {
  display: none;
}
@media (prefers-reduced-motion: reduce) {
  .faq svg {
    transition: none;
  }
}
</style>
