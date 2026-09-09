<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { Menu } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
import AppSidebar from '@/components/layout/AppSidebar.vue'
import SpaceBackdrop from '@/components/layout/SpaceBackdrop.vue'
import HeroSection from '@/components/hero/HeroSection.vue'
import StatsBar from '@/components/stats/StatsBar.vue'
import FeaturedProjects from '@/components/projects/FeaturedProjects.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import TestimonialsSection from '@/components/sections/TestimonialsSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

const activeId = ref('home')
const sidebarOpen = ref(false)
const mainEl = ref<HTMLElement | null>(null)

let rafId = 0
let scrollingProgrammatically = false
let unlockTimer: ReturnType<typeof setTimeout> | null = null

function isDesktopScroll() {
  return window.matchMedia('(min-width: 1024px)').matches
}

function getScrollRoot() {
  return isDesktopScroll() ? mainEl.value : null
}

function updateActiveSection() {
  const root = getScrollRoot()
  const marker = root
    ? root.getBoundingClientRect().top + Math.min(140, root.clientHeight * 0.25)
    : 110

  let current = portfolio.nav[0]?.id ?? 'home'
  for (const { id } of portfolio.nav) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top <= marker) current = id
  }

  if (!scrollingProgrammatically) {
    activeId.value = current
  }
}

function onScroll() {
  if (rafId) cancelAnimationFrame(rafId)
  rafId = requestAnimationFrame(updateActiveSection)
}

function navigate(id: string) {
  const el = document.getElementById(id)
  if (!el) return

  activeId.value = id
  scrollingProgrammatically = true
  if (unlockTimer) clearTimeout(unlockTimer)

  const root = getScrollRoot()
  if (root) {
    const nextTop = root.scrollTop + (el.getBoundingClientRect().top - root.getBoundingClientRect().top)
    root.scrollTo({ top: nextTop, behavior: 'smooth' })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  unlockTimer = setTimeout(() => {
    scrollingProgrammatically = false
    updateActiveSection()
  }, 700)
}

onMounted(async () => {
  await nextTick()
  const root = mainEl.value
  root?.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  updateActiveSection()
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
  if (unlockTimer) clearTimeout(unlockTimer)
  mainEl.value?.removeEventListener('scroll', onScroll)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div class="app-shell">
    <SpaceBackdrop />

    <div
      v-if="sidebarOpen"
      class="backdrop lg-hidden"
      @click="sidebarOpen = false"
    />

    <AppSidebar
      :active-id="activeId"
      :open="sidebarOpen"
      @navigate="navigate"
      @close="sidebarOpen = false"
    />

    <header class="mobile-bar">
      <button
        type="button"
        class="mobile-bar__menu"
        aria-label="Open menu"
        @click="sidebarOpen = true"
      >
        <Menu :size="20" />
      </button>
      <div class="mobile-bar__brand">
        <img
          class="mobile-bar__logo"
          :src="portfolio.avatar"
          :alt="portfolio.name"
        />
        <div class="mobile-bar__titles">
          <span class="mobile-bar__name">{{ portfolio.name }}</span>
          <span class="mobile-bar__official">{{ portfolio.officialName }}</span>
        </div>
      </div>
      <button
        type="button"
        class="mobile-bar__talk"
        @click="navigate('contact')"
      >
        <span class="pulse-dot" aria-hidden="true" />
        Let's Talk
      </button>
    </header>

    <main ref="mainEl" class="main-scroll">
      <HeroSection @navigate="navigate" />
      <StatsBar />
      <FeaturedProjects @navigate="navigate" />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  </div>
</template>

<style scoped>
.app-shell {
  position: relative;
  min-height: 100svh;
  isolation: isolate;
}

.backdrop {
  position: fixed;
  inset: 0;
  z-index: 35;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
}

.mobile-bar {
  display: none;
  position: sticky;
  top: 0;
  z-index: 30;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.85rem;
  padding-top: calc(0.7rem + env(safe-area-inset-top, 0px));
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(8, 8, 20, 0.42);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.mobile-bar__menu {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.mobile-bar__brand {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 600;
  font-size: 0.9rem;
  min-width: 0;
  flex: 1;
}

.mobile-bar__titles {
  display: flex;
  flex-direction: column;
  min-width: 0;
  line-height: 1.15;
}

.mobile-bar__name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-bar__official {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.68rem;
  font-weight: 450;
  color: var(--text-dim);
}

.mobile-bar__logo {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  flex-shrink: 0;
  border: 1.5px solid rgba(168, 85, 247, 0.45);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.25);
  background: var(--surface-solid);
}

.mobile-bar__talk {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 18, 0.85);
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 500;
  white-space: nowrap;
}

.main-scroll {
  position: relative;
  z-index: 1;
  margin-left: calc(var(--sidebar-w) + var(--page-pad) * 2);
  min-height: 100svh;
  overflow-y: auto;
  max-height: 100svh;
  padding-right: 0.15rem;
}

@media (max-width: 1023px) {
  .mobile-bar {
    display: flex;
  }

  .main-scroll {
    margin-left: 0;
    max-height: none;
    overflow: visible;
    padding-bottom: env(safe-area-inset-bottom, 0px);
  }

  .backdrop.lg-hidden {
    display: block;
  }
}

@media (max-width: 380px) {
  .mobile-bar__official {
    display: none;
  }

  .mobile-bar__talk {
    padding: 0.42rem 0.65rem;
  }
}

@media (min-width: 1024px) {
  .backdrop {
    display: none;
  }
}
</style>
