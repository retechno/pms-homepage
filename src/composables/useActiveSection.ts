import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * The id of the section that is currently under the navigation bar, so the
 * navigation can mark where the reader is. Uses IntersectionObserver only.
 */
export function useActiveSection(ids: string[]) {
  const active = ref<string | null>(null)
  let observer: IntersectionObserver | null = null
  const visible = new Map<string, number>()

  onMounted(() => {
    if (!('IntersectionObserver' in window)) return
    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top)
          else visible.delete(e.target.id)
        }
        // The section whose top is nearest the top of the viewport wins.
        let best: string | null = null
        let bestTop = Infinity
        for (const [id, top] of visible) {
          if (Math.abs(top) < bestTop) {
            bestTop = Math.abs(top)
            best = id
          }
        }
        active.value = best
      },
      { rootMargin: '-72px 0px -55% 0px' },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
