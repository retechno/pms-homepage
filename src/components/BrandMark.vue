<script setup lang="ts">
defineProps<{ inverse?: boolean }>()
</script>

<template>
  <span class="inline-flex items-center gap-2.5">
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true" class="shrink-0">
      <rect width="32" height="32" rx="7" :fill="inverse ? '#ffffff' : '#1f6f5c'" />
      <path
        d="M10 8v16M10 16l9-8M13.5 13l6 11"
        :stroke="inverse ? '#0e3a31' : '#ffffff'"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
    <span class="text-[1.0625rem] font-bold tracking-[-0.015em]" :class="inverse ? 'text-white' : 'text-ink'">
      Kamara<span class="font-medium">PMS</span>
    </span>
  </span>
</template>
