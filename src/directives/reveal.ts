import type { Directive, DirectiveBinding } from 'vue'

type RevealEl = HTMLElement & { __revealObserver?: IntersectionObserver }

function getRoot(): Element | null {
  if (typeof window === 'undefined') return null
  const useMain = window.matchMedia('(min-width: 1024px)').matches
  return useMain ? document.querySelector('.main-scroll') : null
}

export const vReveal: Directive<HTMLElement, string | undefined> = {
  mounted(el: RevealEl, binding: DirectiveBinding<string | undefined>) {
    if (binding.value) {
      el.setAttribute('data-reveal', binding.value)
    } else if (!el.hasAttribute('data-reveal')) {
      el.setAttribute('data-reveal', 'up')
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle('is-revealed', entry.isIntersecting)
        }
      },
      {
        root: getRoot(),
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1,
      },
    )

    el.__revealObserver = observer
    observer.observe(el)
  },
  unmounted(el: RevealEl) {
    el.__revealObserver?.disconnect()
    delete el.__revealObserver
  },
}
