<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { portfolio } from '@/data/portfolio'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
  }>(),
  {},
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const progress = ref(0)
let tickTimer: ReturnType<typeof setInterval> | null = null

const percent = computed(() => Math.min(100, Math.round(progress.value)))

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function preloadVideo(src: string) {
  return new Promise<void>((resolve) => {
    const video = document.createElement('video')
    video.preload = 'auto'
    video.muted = true
    video.playsInline = true
    const done = () => resolve()
    video.addEventListener('canplaythrough', done, { once: true })
    video.addEventListener('error', done, { once: true })
    video.src = src
    video.load()
    setTimeout(done, 2800)
  })
}

onMounted(async () => {
  const started = Date.now()
  const minMs = 1500
  const maxMs = 4200

  tickTimer = setInterval(() => {
    if (progress.value >= 90) return
    progress.value += progress.value < 55 ? 3.2 : 1.1
  }, 70)

  try {
    await Promise.race([
      Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        preloadImage(portfolio.avatar),
        preloadVideo(portfolio.videoSrc),
      ]),
      new Promise<void>((resolve) => setTimeout(resolve, maxMs)),
    ])
  } finally {
    if (tickTimer) {
      clearInterval(tickTimer)
      tickTimer = null
    }
    const waitMore = Math.max(0, minMs - (Date.now() - started))
    setTimeout(() => {
      progress.value = 100
      setTimeout(() => emit('update:modelValue', false), 220)
    }, waitMore)
  }
})

onUnmounted(() => {
  if (tickTimer) clearInterval(tickTimer)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="loader-fade">
      <div
        v-if="props.modelValue"
        class="loader"
        role="status"
        aria-live="polite"
        aria-label="Loading portfolio"
      >
        <div class="loader__stars" aria-hidden="true" />
        <div class="loader__glow loader__glow--a" aria-hidden="true" />
        <div class="loader__glow loader__glow--b" aria-hidden="true" />

        <div class="loader__card">
          <div class="loader__avatar-wrap">
            <div class="loader__ring" aria-hidden="true" />
            <div class="loader__avatar">
              <img :src="portfolio.avatar" :alt="portfolio.name" />
            </div>
          </div>

          <p class="loader__role">
            <span class="loader__dot" aria-hidden="true" />
            {{ portfolio.role }}
          </p>

          <h1 class="loader__name">{{ portfolio.name }}</h1>
          <p class="loader__official">{{ portfolio.officialName }}</p>

          <div class="loader__track" aria-hidden="true">
            <div class="loader__fill" :style="{ width: percent + '%' }" />
          </div>
          <p class="loader__meta">{{ percent }}%</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: #07071a;
  overflow: hidden;
}

.loader-fade-enter-active,
.loader-fade-leave-active {
  transition:
    opacity 0.55s ease,
    filter 0.55s ease,
    transform 0.55s ease;
}

.loader-fade-enter-from,
.loader-fade-leave-to {
  opacity: 0;
  filter: blur(10px);
  transform: scale(1.02);
}

.loader__stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1.5px 1.5px at 12% 18%, rgba(255, 255, 255, 0.55), transparent),
    radial-gradient(1px 1px at 28% 62%, rgba(255, 255, 255, 0.35), transparent),
    radial-gradient(1.5px 1.5px at 48% 22%, rgba(255, 255, 255, 0.45), transparent),
    radial-gradient(1px 1px at 66% 74%, rgba(255, 255, 255, 0.3), transparent),
    radial-gradient(1.5px 1.5px at 82% 36%, rgba(255, 255, 255, 0.5), transparent),
    radial-gradient(1px 1px at 90% 88%, rgba(255, 255, 255, 0.28), transparent),
    radial-gradient(1px 1px at 8% 84%, rgba(255, 255, 255, 0.32), transparent),
    radial-gradient(1.5px 1.5px at 55% 48%, rgba(255, 255, 255, 0.22), transparent);
  opacity: 0.7;
  animation: loader-twinkle 3.6s ease-in-out infinite;
}

.loader__glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(50px);
  pointer-events: none;
}

.loader__glow--a {
  width: min(420px, 70vw);
  height: min(420px, 70vw);
  top: 18%;
  left: 50%;
  transform: translateX(-58%);
  background: rgba(168, 85, 247, 0.28);
}

.loader__glow--b {
  width: min(360px, 60vw);
  height: min(360px, 60vw);
  bottom: 12%;
  left: 52%;
  transform: translateX(-30%);
  background: rgba(56, 189, 248, 0.18);
}

.loader__card {
  position: relative;
  z-index: 1;
  width: min(100%, 340px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem 1.5rem 1.6rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(8, 8, 18, 0.72);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.45),
    inset 0 0 0 1px rgba(192, 132, 252, 0.06);
  animation: loader-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.loader__avatar-wrap {
  position: relative;
  width: 108px;
  height: 108px;
  margin-bottom: 1.25rem;
}

.loader__ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--gradient-ring);
  animation: loader-spin 3.2s linear infinite;
  filter: drop-shadow(0 0 18px rgba(168, 85, 247, 0.45));
}

.loader__avatar {
  position: absolute;
  inset: 3px;
  border-radius: 50%;
  overflow: hidden;
  background: #070712;
  border: 2.5px solid #070712;
}

.loader__avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
}

.loader__role {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin: 0 0 0.85rem;
  padding: 0.38rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(12, 12, 22, 0.65);
  color: var(--text-dim);
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
}

.loader__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.55);
  animation: pulse-dot 2s ease-out infinite;
}

.loader__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 5vw, 2rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.loader__official {
  margin: 0.35rem 0 1.35rem;
  color: var(--text-dim);
  font-size: 0.8rem;
}

.loader__track {
  width: 100%;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.loader__fill {
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: var(--gradient-btn);
  box-shadow: 0 0 16px rgba(168, 85, 247, 0.45);
  transition: width 0.18s ease;
}

.loader__meta {
  margin: 0.7rem 0 0;
  color: var(--text-dim);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  letter-spacing: 0.04em;
}

@keyframes loader-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes loader-rise {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes loader-twinkle {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.85;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader__ring,
  .loader__stars,
  .loader__card,
  .loader__dot {
    animation: none;
  }

  .loader-fade-enter-active,
  .loader-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .loader-fade-enter-from,
  .loader-fade-leave-to {
    filter: none;
    transform: none;
  }
}
</style>
