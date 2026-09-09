<script setup lang="ts">
import { ArrowDownToLine, Zap } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
import HeroVideo from './HeroVideo.vue'

const emit = defineEmits<{
  navigate: [id: string]
}>()
</script>

<template>
  <section id="home" class="hero">
    <button
      type="button"
      class="hero__lets-talk float-y"
      @click="emit('navigate', 'contact')"
    >
      <span class="pulse-dot" aria-hidden="true" />
      Let's Talk
    </button>

    <div class="hero__stage">
      <div class="hero__copy">
        <div class="hero__badge hero-enter">
          <Zap :size="14" class="hero__badge-icon" />
          <span>{{ portfolio.role.toUpperCase() }}</span>
        </div>

        <h1 class="hero__title hero-enter hero-enter--delay-1">
          <span class="hero__greeting">Hi, I'm</span>
          <span class="gradient-text hero__name">{{ portfolio.name }}</span>
        </h1>

        <p class="hero__tagline hero-enter hero-enter--delay-2">
          {{ portfolio.tagline }}
        </p>

        <div class="hero__actions hero-enter hero-enter--delay-3">
          <button type="button" class="btn-primary" @click="emit('navigate', 'projects')">
            View My Work
          </button>
          <a class="btn-outline" :href="portfolio.cvUrl" download>
            <ArrowDownToLine :size="18" />
            Resume
          </a>
        </div>
      </div>

      <div class="hero__visual hero-enter hero-enter--delay-4">
        <div
          v-if="portfolio.available"
          class="hero__available float-y"
          style="animation-delay: 0.5s"
        >
          <span class="pulse-dot" aria-hidden="true" />
          <span>{{ portfolio.availableLabel }}</span>
        </div>

        <HeroVideo :src="portfolio.videoSrc" />

        <a href="#about" class="hero__scroll" aria-label="Scroll to about">
          <span class="hero__mouse">
            <span class="hero__wheel scroll-wheel" />
          </span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: clamp(0.75rem, 1.5vh, 1.25rem) clamp(1.25rem, 2.2vw, 2rem) 0.35rem;
  min-height: clamp(420px, 56svh, 560px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
}

.hero__lets-talk {
  position: absolute;
  top: clamp(0.75rem, 1.5vh, 1.25rem);
  right: clamp(1rem, 2vw, 1.75rem);
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.48rem 0.95rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 18, 0.78);
  backdrop-filter: blur(14px);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease;
}

.hero__lets-talk:hover {
  border-color: rgba(34, 197, 94, 0.45);
  color: var(--text);
}

.hero__stage {
  display: grid;
  grid-template-columns: minmax(260px, 0.95fr) minmax(320px, 1.2fr);
  gap: clamp(0.75rem, 2vw, 1.75rem);
  align-items: center;
  width: 100%;
  overflow: visible;
}

.hero__copy {
  position: relative;
  z-index: 2;
  padding-right: 0.5rem;
  max-width: 34rem;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.38rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(12, 12, 22, 0.55);
  color: var(--text-dim);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  margin-bottom: clamp(0.85rem, 1.6vh, 1.15rem);
  backdrop-filter: blur(10px);
}

.hero__badge-icon {
  color: var(--gold);
  flex-shrink: 0;
  opacity: 0.85;
}

.hero__title {
  font-size: clamp(2.35rem, 4.8vw, 3.85rem);
  line-height: 1.05;
  margin-bottom: clamp(0.7rem, 1.4vh, 0.95rem);
  font-weight: 700;
  letter-spacing: -0.035em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.02em;
}

.hero__greeting {
  color: rgba(242, 242, 248, 0.78);
  font-weight: 600;
  font-size: 0.52em;
  letter-spacing: -0.02em;
}

.hero__name {
  display: inline;
  filter: drop-shadow(0 0 28px rgba(168, 85, 247, 0.35));
}

.hero__tagline {
  max-width: 34rem;
  color: var(--text-muted);
  font-size: clamp(0.95rem, 1.15vw, 1.05rem);
  font-weight: 400;
  line-height: 1.65;
  margin-bottom: clamp(1.35rem, 2.6vh, 1.85rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

.hero__visual {
  position: relative;
  min-height: clamp(360px, 50svh, 520px);
  z-index: 1;
  overflow: visible;
}

.hero__available {
  position: absolute;
  top: 40%;
  right: 2%;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.55rem 0.85rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(10, 10, 18, 0.78);
  backdrop-filter: blur(14px);
  font-size: 0.74rem;
  color: var(--text-muted);
  max-width: 9.5rem;
  line-height: 1.3;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.35);
}

.hero__scroll {
  position: absolute;
  right: 0.35rem;
  bottom: 0.15rem;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.45;
  transition: opacity 0.2s ease;
}

.hero__scroll:hover {
  opacity: 0.8;
}

.hero__mouse {
  width: 18px;
  height: 28px;
  border: 1.5px solid rgba(255, 255, 255, 0.28);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding-top: 5px;
}

.hero__wheel {
  width: 2.5px;
  height: 5px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.65);
}

@media (max-width: 1100px) {
  .hero {
    min-height: auto;
    padding: 1.5rem 1.25rem 0.5rem;
  }

  .hero__lets-talk {
    top: 1rem;
    right: 1.25rem;
  }

  .hero__stage {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }

  .hero__copy {
    max-width: none;
    order: 1;
  }

  .hero__title {
    flex-direction: column;
  }

  .hero__greeting {
    font-size: 0.58em;
  }

  .hero__visual {
    min-height: 360px;
    order: 0;
  }

  .hero__available {
    right: 0.5rem;
    top: auto;
    bottom: 3.5rem;
  }
}

@media (max-width: 640px) {
  .hero__title {
    font-size: 2.2rem;
  }

  .hero__visual {
    min-height: 280px;
  }

  .hero__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .hero__actions .btn-primary,
  .hero__actions .btn-outline {
    width: 100%;
    justify-content: center;
  }
}
</style>
