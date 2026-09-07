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
    <a href="#contact" class="hero__lets-talk float-y">
      <span class="pulse-dot" aria-hidden="true" />
      Let's Talk
    </a>

    <div class="hero__stage">
      <div class="hero__copy">
        <div class="hero__badge">
          <Zap :size="14" class="hero__badge-icon" />
          <span>{{ portfolio.role.toUpperCase() }}</span>
        </div>

        <h1 class="hero__title">
          <span class="hero__greeting">Hi, I'm</span>
          <span class="gradient-text">{{ portfolio.name }}</span>
        </h1>

        <p class="hero__tagline">
          I build exceptional digital experiences with
          <span class="accent-text">Flutter</span>,
          <span class="accent-text">Laravel</span> &amp; modern technologies.
        </p>

        <div class="hero__actions">
          <button type="button" class="btn-primary" @click="emit('navigate', 'projects')">
            View My Work
          </button>
          <a class="btn-outline" :href="portfolio.cvUrl" download>
            <ArrowDownToLine :size="18" />
            Download CV
          </a>
        </div>
      </div>

      <div class="hero__visual">
        <div
          v-if="portfolio.available"
          class="hero__available float-y"
          style="animation-delay: 0.5s"
        >
          <span class="pulse-dot" aria-hidden="true" />
          <span>{{ portfolio.availableLabel }}</span>
        </div>

        <HeroVideo :src="portfolio.videoSrc" />

        <a href="#about" class="hero__scroll" aria-label="Scroll down">
          <span class="hero__mouse">
            <span class="hero__wheel scroll-wheel" />
          </span>
          <span>Scroll Down</span>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: 0 clamp(1.25rem, 2.2vw, 2rem) 0.25rem;
  min-height: clamp(400px, 54svh, 540px);
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
  font-size: 0.8rem;
  font-weight: 500;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.35);
  transition: border-color 0.2s ease;
}

.hero__lets-talk:hover {
  border-color: rgba(34, 197, 94, 0.45);
}

.hero__stage {
  display: grid;
  grid-template-columns: minmax(260px, 0.88fr) minmax(320px, 1.28fr);
  gap: clamp(0.5rem, 1.5vw, 1.25rem) clamp(0.75rem, 2vw, 1.5rem);
  align-items: center;
  width: 100%;
}

.hero__copy {
  position: relative;
  z-index: 2;
  padding-right: 0.25rem;
  max-width: 32rem;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 12, 22, 0.75);
  color: var(--text-muted);
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  margin-bottom: clamp(0.9rem, 1.8vh, 1.35rem);
  backdrop-filter: blur(10px);
}

.hero__badge-icon {
  color: var(--gold);
  flex-shrink: 0;
}

.hero__title {
  font-size: clamp(2.2rem, 4.2vw, 3.35rem);
  line-height: 1.1;
  margin-bottom: clamp(0.75rem, 1.5vh, 1rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.05em;
}

.hero__greeting {
  color: var(--text);
  font-weight: 700;
}

.hero__title .gradient-text {
  display: inline;
}

.hero__tagline {
  max-width: 30rem;
  color: var(--text-muted);
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.65;
  margin-bottom: clamp(1.25rem, 2.5vh, 1.85rem);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__visual {
  position: relative;
  min-height: clamp(400px, 54svh, 540px);
  z-index: 1;
  overflow: visible;
  margin-top: -0.5rem;
}

.hero__available {
  position: absolute;
  top: 42%;
  right: 2%;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 0.95rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(10, 10, 18, 0.82);
  backdrop-filter: blur(16px);
  font-size: 0.78rem;
  color: var(--text);
  max-width: 10.5rem;
  line-height: 1.35;
  box-shadow: 0 14px 40px rgba(0, 0, 0, 0.4);
}

.hero__scroll {
  position: absolute;
  right: 0.5rem;
  bottom: 0;
  z-index: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  color: var(--text-dim);
  font-size: 0.68rem;
  letter-spacing: 0.05em;
}

.hero__mouse {
  width: 20px;
  height: 32px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.hero__wheel {
  width: 3px;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
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
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.35rem;
  }

  .hero__visual {
    min-height: 360px;
    order: 0;
  }

  .hero__available {
    right: 0.5rem;
    top: auto;
    bottom: 4.25rem;
  }
}

@media (max-width: 640px) {
  .hero__title {
    font-size: 2.05rem;
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
  }
}
</style>
