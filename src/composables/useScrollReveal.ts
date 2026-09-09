export type RevealOptions = {
  root?: Element | null
  rootMargin?: string
  threshold?: number | number[]
}

/**
 * Observes [data-reveal] elements and toggles `.is-revealed`
 * for fade in / fade out as they enter or leave the viewport.
 */
export function setupScrollReveal(options: RevealOptions = {}) {
  const {
    root = null,
    rootMargin = '0px 0px -8% 0px',
    threshold = 0.12,
  } = options

  const elements = Array.from(
    (root ?? document).querySelectorAll<HTMLElement>('[data-reveal]'),
  )

  if (!elements.length) {
    return () => undefined
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        entry.target.classList.toggle('is-revealed', entry.isIntersecting)
      }
    },
    { root, rootMargin, threshold },
  )

  for (const el of elements) {
    observer.observe(el)
  }

  return () => observer.disconnect()
}
