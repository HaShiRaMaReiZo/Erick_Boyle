<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
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

let observer: IntersectionObserver | null = null

function navigate(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  activeId.value = id
}

function setupObserver() {
  const ids = portfolio.nav.map((n) => n.id)
  const useMainAsRoot = window.matchMedia('(min-width: 1024px)').matches

  observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]?.target.id) {
        activeId.value = visible[0].target.id
      }
    },
    {
      root: useMainAsRoot ? mainEl.value : null,
      rootMargin: '-20% 0px -55% 0px',
      threshold: [0.1, 0.25, 0.5],
    },
  )

  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })
}

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  observer?.disconnect()
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
        <span class="mobile-bar__logo">{{ portfolio.initials }}</span>
        <span>{{ portfolio.name }}</span>
      </div>
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
  gap: 0.85rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--border);
  background: rgba(8, 8, 20, 0.88);
  backdrop-filter: blur(14px);
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
}

.mobile-bar__brand {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
  font-size: 0.95rem;
}

.mobile-bar__logo {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-family: var(--font-display);
  color: white;
  background: var(--gradient-btn);
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
  }

  .backdrop.lg-hidden {
    display: block;
  }
}

@media (min-width: 1024px) {
  .backdrop {
    display: none;
  }
}
</style>
