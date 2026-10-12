<script setup lang="ts">
import TodayBoard from './mockups/TodayBoard.vue'
</script>

<template>
  <section id="top" class="relative" aria-labelledby="hero-title">
    <div class="page pb-10 pt-12 md:pt-20 lg:pb-14">
      <div class="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <h1 id="hero-title" class="t-display max-w-[16ch] lg:col-span-7">From check-in to closed books, in one system.</h1>
        <div class="lg:col-span-5 lg:pb-1.5">
          <p class="t-lead max-w-[46ch] text-ink-soft">
            KamaraPMS runs reservations, the front desk, housekeeping and the cashier, and posts every charge to a full hotel ledger. Indonesian VAT
            returns and faktur pajak are part of the same system.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a href="#demo" class="btn btn-primary">Book a demo</a>
            <a href="#front-office" class="btn btn-quiet">Explore features</a>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 top-[38%] bg-mist" aria-hidden="true" />
      <div class="page relative pb-6">
        <TodayBoard />
        <p class="t-caption mt-3 text-muted">The Today screen every member of staff opens on. Hotel, guests and figures are sample data.</p>
      </div>
    </div>
  </section>
</template>
