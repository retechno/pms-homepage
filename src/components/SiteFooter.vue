<script setup lang="ts">
import BrandMark from './BrandMark.vue'
import { productLinks } from '@/content/nav'
import { site } from '@/site.config'

const year = new Date().getFullYear()
const company = [
  { label: 'Who it’s for', href: '#who' },
  { label: 'Integrations', href: '#integrations' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Book a demo', href: '#demo' },
]
const legal = [
  site.privacyUrl && { label: 'Privacy policy', href: site.privacyUrl },
  site.termsUrl && { label: 'Terms of service', href: site.termsUrl },
].filter(Boolean) as { label: string; href: string }[]
</script>

<template>
  <footer class="bg-pine text-pine-text">
    <div class="page border-t border-pine-line py-14">
      <div class="grid gap-10 md:grid-cols-12">
        <div class="md:col-span-4">
          <BrandMark inverse />
          <p class="mt-4 max-w-[34ch] text-[0.9375rem]">Hotel management and accounting in one system, for hotels in Indonesia.</p>
          <p v-if="site.salesEmail" class="mt-4 text-[0.9375rem]">
            <a :href="`mailto:${site.salesEmail}`" class="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">{{ site.salesEmail }}</a>
          </p>
        </div>
        <nav class="md:col-span-4" aria-label="Product">
          <p class="t-label text-white">Product</p>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li v-for="l in productLinks" :key="l.href"><a :href="l.href" class="hover:text-white">{{ l.label }}</a></li>
          </ul>
        </nav>
        <nav class="md:col-span-4" aria-label="More">
          <p class="t-label text-white">More</p>
          <ul class="mt-3 space-y-2 text-[0.9375rem]">
            <li v-for="l in company" :key="l.href"><a :href="l.href" class="hover:text-white">{{ l.label }}</a></li>
            <li v-if="site.loginUrl"><a :href="site.loginUrl" class="hover:text-white">Log in</a></li>
          </ul>
        </nav>
      </div>
      <div class="mt-12 flex flex-col gap-3 border-t border-pine-line pt-6 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ year }} KamaraPMS</p>
        <ul v-if="legal.length" class="flex gap-5">
          <li v-for="l in legal" :key="l.href"><a :href="l.href" class="hover:text-white">{{ l.label }}</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>
