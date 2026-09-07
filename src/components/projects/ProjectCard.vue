<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import type { Project } from '@/data/portfolio'

const props = defineProps<{
  project: Project
}>()

function placeholderSrc(title: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1e1b4b"/><stop offset="1" stop-color="#312e81"/></linearGradient></defs><rect width="640" height="400" fill="url(#g)"/><text x="50%" y="50%" text-anchor="middle" fill="#c4b5fd" font-family="sans-serif" font-size="28">${title}</text></svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
}

function onImgError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = placeholderSrc(props.project.title)
}
</script>

<template>
  <article class="card">
    <div class="card__media">
      <img :src="project.image" :alt="project.title" @error="onImgError" />
    </div>
    <div class="card__body">
      <div>
        <h3 class="card__title">{{ project.title }}</h3>
        <p class="card__tech">{{ project.tech.slice(0, 4).join(', ') }}</p>
      </div>
      <a
        :href="project.url"
        class="card__arrow"
        :aria-label="'Open ' + project.title"
      >
        <ArrowUpRight :size="16" />
      </a>
    </div>
  </article>
</template>

<style scoped>
.card {
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(12, 12, 20, 0.78);
  overflow: hidden;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.card:hover {
  transform: translateY(-3px);
  border-color: rgba(168, 85, 247, 0.32);
  box-shadow: 0 14px 36px rgba(0, 0, 0, 0.35), 0 0 26px rgba(168, 85, 247, 0.1);
}

.card__media {
  aspect-ratio: 16 / 11;
  overflow: hidden;
  background: #0e0e18;
}

.card__media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.card:hover .card__media img {
  transform: scale(1.04);
}

.card__body {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.65rem;
  padding: 0.85rem 0.95rem 0.95rem;
}

.card__title {
  font-size: 0.98rem;
  margin-bottom: 0.28rem;
  font-weight: 600;
}

.card__tech {
  color: var(--text-dim);
  font-size: 0.74rem;
  line-height: 1.4;
}

.card__arrow {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: var(--text-muted);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.card__arrow:hover {
  color: white;
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(168, 85, 247, 0.15);
}
</style>
