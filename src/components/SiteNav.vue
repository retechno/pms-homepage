<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BrandMark from './BrandMark.vue'
import { mainLinks, productLinks, productSectionIds } from '@/content/nav'
import { useActiveSection } from '@/composables/useActiveSection'
import { site } from '@/site.config'

const menuOpen = ref(false) // Product dropdown (desktop)
const mobileOpen = ref(false)
const scrolled = ref(false)

const menuRoot = ref<HTMLElement | null>(null)
const menuButton = ref<HTMLButtonElement | null>(null)
const mobilePanel = ref<HTMLElement | null>(null)
const mobileButton = ref<HTMLButtonElement | null>(null)

const active = useActiveSection([...productSectionIds, ...mainLinks.map((l) => l.href.slice(1))])
const productActive = computed(() => active.value !== null && productSectionIds.includes(active.value))

function onScroll() {
  scrolled.value = window.scrollY > 8
}
function onDocClick(e: MouseEvent) {
  if (menuOpen.value && menuRoot.value && !menuRoot.value.contains(e.target as Node)) menuOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape') return
  if (menuOpen.value) {
    menuOpen.value = false
    menuButton.value?.focus()
  }
  if (mobileOpen.value) {
    mobileOpen.value = false
    mobileButton.value?.focus()
  }
}
function onMenuKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    menuOpen.value = true
    nextTick(() => menuRoot.value?.querySelector<HTMLElement>('[role="menu"] a')?.focus())
  }
}
function onItemsKey(e: KeyboardEvent) {
  if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
  e.preventDefault()
  const items = Array.from(menuRoot.value?.querySelectorAll<HTMLElement>('[role="menu"] a') ?? [])
  const i = items.indexOf(document.activeElement as HTMLElement)
  const next = e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length
  items[next]?.focus()
}

watch(mobileOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
  if (open) nextTick(() => mobilePanel.value?.querySelector<HTMLElement>('a, button')?.focus())
})

// Close the mobile menu if the viewport grows past the breakpoint.
let mq: MediaQueryList | null = null
function onMq(e: MediaQueryListEvent) {
  if (e.matches) mobileOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
  mq = window.matchMedia('(min-width: 1024px)')
  mq.addEventListener('change', onMq)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  mq?.removeEventListener('change', onMq)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b bg-paper transition-colors"
    :class="scrolled ? 'border-line' : 'border-transparent'"
  >
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-paper focus:px-3 focus:py-2"
      >Skip to content</a
    >
    <nav class="page flex h-16 items-center gap-2 sm:gap-6" aria-label="Main">
      <a href="#top" class="rounded-md" aria-label="KamaraPMS, back to top"><BrandMark /></a>

      <ul class="ml-4 hidden items-center gap-1 lg:flex">
        <li ref="menuRoot" class="relative">
          <button
            ref="menuButton"
            type="button"
            class="nav-item inline-flex items-center gap-1"
            :class="{ 'is-active': productActive }"
            :aria-expanded="menuOpen"
            aria-haspopup="true"
            aria-controls="product-menu"
            @click="menuOpen = !menuOpen"
            @keydown="onMenuKey"
          >
            Product
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" class="transition-transform" :class="{ 'rotate-180': menuOpen }">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
          <Transition name="drop">
            <div
              v-show="menuOpen"
              id="product-menu"
              role="menu"
              aria-label="Product"
              class="absolute left-0 top-[calc(100%+10px)] w-[23rem] rounded-[var(--radius-card)] border border-line bg-paper p-2 shadow-[var(--shadow-frame)]"
              @keydown="onItemsKey"
            >
              <a
                v-for="link in productLinks"
                :key="link.href"
                role="menuitem"
                :href="link.href"
                class="block rounded-[var(--radius-control)] px-3 py-2.5 hover:bg-mist focus-visible:bg-mist"
                @click="menuOpen = false"
              >
                <span class="block text-[0.9375rem] font-semibold text-ink">{{ link.label }}</span>
                <span class="t-caption block text-muted">{{ link.note }}</span>
              </a>
            </div>
          </Transition>
        </li>
        <li v-for="link in mainLinks" :key="link.href">
          <a :href="link.href" class="nav-item" :class="{ 'is-active': active === link.href.slice(1) }" :aria-current="active === link.href.slice(1) ? 'location' : undefined">{{
            link.label
          }}</a>
        </li>
      </ul>

      <div class="ml-auto flex items-center gap-1 sm:gap-2">
        <a v-if="site.loginUrl" :href="site.loginUrl" class="nav-item hidden md:inline-flex">Log in</a>
        <a href="#demo" class="btn btn-primary min-h-10 px-3 text-[0.875rem] sm:min-h-11 sm:px-[1.125rem] sm:text-[0.9375rem]">Book a demo</a>
        <button
          ref="mobileButton"
          type="button"
          class="-mr-2 inline-flex size-11 items-center justify-center rounded-[var(--radius-control)] text-ink hover:bg-mist lg:hidden"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-menu"
          @click="mobileOpen = !mobileOpen"
        >
          <span class="sr-only">{{ mobileOpen ? 'Close menu' : 'Open menu' }}</span>
          <svg v-if="!mobileOpen" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <div
      v-show="mobileOpen"
      id="mobile-menu"
      ref="mobilePanel"
      class="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-paper lg:hidden"
    >
      <div class="page flex min-h-full flex-col py-5">
        <p class="t-label px-1 text-muted">Product</p>
        <ul class="mt-2">
          <li v-for="link in productLinks" :key="link.href">
            <a :href="link.href" class="block rounded-[var(--radius-control)] px-1 py-2.5 hover:bg-mist" @click="mobileOpen = false">
              <span class="block font-semibold">{{ link.label }}</span>
              <span class="t-caption block text-muted">{{ link.note }}</span>
            </a>
          </li>
        </ul>
        <ul class="mt-4 border-t border-line pt-4">
          <li v-for="link in mainLinks" :key="link.href">
            <a :href="link.href" class="block rounded-[var(--radius-control)] px-1 py-3 text-[1.0625rem] font-semibold hover:bg-mist" @click="mobileOpen = false">{{ link.label }}</a>
          </li>
        </ul>
        <div class="mt-auto grid gap-2 pt-6">
          <a href="#demo" class="btn btn-primary w-full" @click="mobileOpen = false">Book a demo</a>
          <a v-if="site.loginUrl" :href="site.loginUrl" class="btn btn-quiet w-full">Log in</a>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.nav-item {
  display: inline-flex;
  align-items: center;
  min-height: 2.5rem;
  padding: 0 0.75rem;
  border-radius: var(--radius-control);
  font-size: 0.9375rem;
  font-weight: 550;
  color: var(--color-ink-soft);
  transition:
    color 0.15s,
    background-color 0.15s;
}
.nav-item:hover {
  color: var(--color-ink);
  background: var(--color-mist);
}
.nav-item.is-active {
  color: var(--color-ledger);
}
.drop-enter-active,
.drop-leave-active {
  transition:
    opacity 0.14s ease,
    transform 0.14s ease;
}
.drop-enter-from,
.drop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
@media (prefers-reduced-motion: reduce) {
  .drop-enter-active,
  .drop-leave-active {
    transition: none;
  }
}
</style>
