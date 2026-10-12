<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import type { Site } from '@/site.config'

const props = defineProps<{ site: Pick<Site, 'demoEndpoint' | 'salesEmail'> }>()

const form = reactive({ name: '', hotel: '', email: '', phone: '', rooms: '', message: '' })
const status = ref<'idle' | 'sending' | 'sent' | 'failed'>('idle')
const errors = reactive<Record<string, string>>({})

const mode = computed<'post' | 'mail' | 'none'>(() => (props.site.demoEndpoint ? 'post' : props.site.salesEmail ? 'mail' : 'none'))

if (import.meta.env.DEV && mode.value === 'none') {
  console.warn('[homepage] Neither VITE_DEMO_ENDPOINT nor VITE_SALES_EMAIL is set: the demo form is hidden.')
}

function validate(): boolean {
  for (const k of Object.keys(errors)) delete errors[k]
  if (!form.name.trim()) errors.name = 'Enter your name.'
  if (!form.hotel.trim()) errors.hotel = 'Enter the name of your hotel.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter an e-mail address, like name@hotel.com.'
  if (form.rooms && !/^\d{1,5}$/.test(form.rooms.trim())) errors.rooms = 'Enter the number of rooms as a whole number.'
  return Object.keys(errors).length === 0
}

function mailBody(): string {
  return [
    `Name: ${form.name}`,
    `Hotel: ${form.hotel}`,
    `E-mail: ${form.email}`,
    form.phone && `Phone or WhatsApp: ${form.phone}`,
    form.rooms && `Rooms: ${form.rooms}`,
    form.message && `\n${form.message}`,
  ]
    .filter(Boolean)
    .join('\n')
}

const mailHref = computed(() =>
  props.site.salesEmail
    ? `mailto:${props.site.salesEmail}?subject=${encodeURIComponent(`KamaraPMS demo: ${form.hotel || 'my hotel'}`)}&body=${encodeURIComponent(mailBody())}`
    : '',
)

async function submit() {
  if (!validate()) {
    const first = Object.keys(errors)[0]
    document.getElementById(`demo-${first}`)?.focus()
    return
  }
  if (mode.value === 'mail') {
    window.location.href = mailHref.value
    status.value = 'sent'
    return
  }
  status.value = 'sending'
  try {
    const res = await fetch(props.site.demoEndpoint!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...form, source: 'homepage' }),
    })
    status.value = res.ok ? 'sent' : 'failed'
  } catch {
    status.value = 'failed'
  }
}

const field =
  'mt-1.5 block w-full rounded-[var(--radius-control)] border border-line-strong bg-paper px-3.5 py-2.5 text-[0.9375rem] text-ink placeholder:text-muted/70 focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/25 aria-[invalid=true]:border-[#b4332c]'
</script>

<template>
  <div v-if="mode === 'none'" class="rounded-[var(--radius-frame)] bg-paper p-6 text-ink md:p-8" data-test="demo-closed">
    <p class="t-h3">Demo requests open soon</p>
    <p class="mt-2 text-muted">The request form will appear here once the sales team’s address is set up.</p>
  </div>

  <div v-else-if="status === 'sent'" class="rounded-[var(--radius-frame)] bg-paper p-6 text-ink md:p-8" role="status" data-test="demo-sent">
    <p class="t-h3">{{ mode === 'mail' ? 'Your e-mail is ready to send' : 'Request sent' }}</p>
    <p class="mt-2 text-muted">
      <template v-if="mode === 'mail'">Your e-mail app has opened with the request filled in. Send it from there and we will reply to {{ form.email }}.</template>
      <template v-else>We will reply to {{ form.email }} to arrange a time.</template>
    </p>
  </div>

  <form v-else class="rounded-[var(--radius-frame)] bg-paper p-6 text-ink md:p-8" novalidate data-test="demo-form" @submit.prevent="submit">
    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="demo-name" class="t-label">Your name</label>
        <input id="demo-name" v-model="form.name" autocomplete="name" :class="field" :aria-invalid="!!errors.name" :aria-describedby="errors.name ? 'demo-name-err' : undefined" />
        <p v-if="errors.name" id="demo-name-err" class="t-caption mt-1 text-[#b4332c]">{{ errors.name }}</p>
      </div>
      <div>
        <label for="demo-hotel" class="t-label">Hotel</label>
        <input id="demo-hotel" v-model="form.hotel" autocomplete="organization" :class="field" :aria-invalid="!!errors.hotel" :aria-describedby="errors.hotel ? 'demo-hotel-err' : undefined" />
        <p v-if="errors.hotel" id="demo-hotel-err" class="t-caption mt-1 text-[#b4332c]">{{ errors.hotel }}</p>
      </div>
      <div>
        <label for="demo-email" class="t-label">E-mail</label>
        <input id="demo-email" v-model="form.email" type="email" autocomplete="email" :class="field" :aria-invalid="!!errors.email" :aria-describedby="errors.email ? 'demo-email-err' : undefined" />
        <p v-if="errors.email" id="demo-email-err" class="t-caption mt-1 text-[#b4332c]">{{ errors.email }}</p>
      </div>
      <div>
        <label for="demo-phone" class="t-label">Phone or WhatsApp <span class="font-normal text-muted">(optional)</span></label>
        <input id="demo-phone" v-model="form.phone" type="tel" autocomplete="tel" :class="field" />
      </div>
      <div>
        <label for="demo-rooms" class="t-label">Number of rooms <span class="font-normal text-muted">(optional)</span></label>
        <input id="demo-rooms" v-model="form.rooms" inputmode="numeric" :class="field" :aria-invalid="!!errors.rooms" :aria-describedby="errors.rooms ? 'demo-rooms-err' : undefined" />
        <p v-if="errors.rooms" id="demo-rooms-err" class="t-caption mt-1 text-[#b4332c]">{{ errors.rooms }}</p>
      </div>
      <div class="sm:col-span-2">
        <label for="demo-message" class="t-label">What should we show you? <span class="font-normal text-muted">(optional)</span></label>
        <textarea id="demo-message" v-model="form.message" rows="3" :class="field" />
      </div>
    </div>

    <p v-if="status === 'failed'" class="mt-4 rounded-[var(--radius-control)] bg-[#fbeceb] px-3.5 py-2.5 text-[0.9375rem] text-[#8f2822]" role="alert" data-test="demo-failed">
      The request did not reach us. Check your connection and send it again<template v-if="site.salesEmail">, or e-mail <a :href="mailHref" class="font-semibold underline">{{ site.salesEmail }}</a></template>.
    </p>

    <div class="mt-6 flex flex-wrap items-center gap-4">
      <button type="submit" class="btn btn-primary" :disabled="status === 'sending'">
        {{ status === 'sending' ? 'Sending request…' : mode === 'mail' ? 'Request a demo by e-mail' : 'Request a demo' }}
      </button>
      <p v-if="site.salesEmail && mode === 'post'" class="t-caption text-muted">
        Or e-mail <a :href="`mailto:${site.salesEmail}`" class="text-link">{{ site.salesEmail }}</a>
      </p>
    </div>
  </form>
</template>
