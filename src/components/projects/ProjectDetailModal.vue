<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { ChevronLeft, ChevronRight, X } from '@lucide/vue'
import type { Project } from '@/data/portfolio'

const props = defineProps<{
  project: Project | null
}>()

const emit = defineEmits<{
  close: []
}>()

const imageIndex = ref(0)
const componentIndex = ref<number | null>(null)

const hasComponentScreenshots = computed(
  () => props.project?.components?.some((c) => (c.screenshots?.length ?? 0) > 0) ?? false,
)

const currentScreenshots = computed(() => {
  const project = props.project
  if (!project) return [] as string[]

  if (hasComponentScreenshots.value && project.components) {
    if (componentIndex.value !== null) {
      return project.components[componentIndex.value]?.screenshots ?? []
    }
    return project.components.flatMap((c) => c.screenshots ?? [])
  }

  return project.screenshots?.length ? project.screenshots : [project.image]
})

const activeComponent = computed(() => {
  if (componentIndex.value === null || !props.project?.components) return null
  return props.project.components[componentIndex.value] ?? null
})

watch(
  () => props.project?.id,
  () => {
    imageIndex.value = 0
    componentIndex.value = null
  },
)

watch(currentScreenshots, (shots) => {
  if (imageIndex.value >= shots.length) imageIndex.value = 0
})

function selectComponent(index: number | null) {
  componentIndex.value = index
  imageIndex.value = 0
}

function prevImage() {
  if (imageIndex.value > 0) imageIndex.value -= 1
}

function nextImage() {
  if (imageIndex.value < currentScreenshots.value.length - 1) imageIndex.value += 1
}

function onKeydown(event: KeyboardEvent) {
  if (!props.project) return
  if (event.key === 'Escape') emit('close')
  if (event.key === 'ArrowLeft') prevImage()
  if (event.key === 'ArrowRight') nextImage()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="modal"
      role="dialog"
      aria-modal="true"
      :aria-label="project.title"
      @click.self="emit('close')"
    >
      <div class="modal__panel">
        <header class="modal__header">
          <h3>{{ project.title }}</h3>
          <button type="button" class="modal__close" aria-label="Close" @click="emit('close')">
            <X :size="18" />
          </button>
        </header>

        <div class="modal__body">
          <div v-if="hasComponentScreenshots && project.components" class="modal__tabs">
            <button
              type="button"
              class="modal__tab"
              :class="{ 'modal__tab--active': componentIndex === null }"
              @click="selectComponent(null)"
            >
              All Screenshots
            </button>
            <button
              v-for="(component, index) in project.components"
              v-show="component.screenshots?.length"
              :key="component.name"
              type="button"
              class="modal__tab"
              :class="{ 'modal__tab--active': componentIndex === index }"
              @click="selectComponent(index)"
            >
              {{ component.name }}
            </button>
          </div>

          <p v-if="activeComponent" class="modal__component-note">
            <strong>{{ activeComponent.name }}:</strong>
            {{ activeComponent.description }}
          </p>

          <div v-if="currentScreenshots.length" class="modal__gallery">
            <div class="modal__stage">
              <img
                :src="currentScreenshots[imageIndex] || currentScreenshots[0]"
                :alt="project.title + ' screenshot ' + (imageIndex + 1)"
              />
              <button
                v-if="currentScreenshots.length > 1"
                type="button"
                class="modal__nav modal__nav--prev"
                :disabled="imageIndex === 0"
                aria-label="Previous screenshot"
                @click="prevImage"
              >
                <ChevronLeft :size="18" />
              </button>
              <button
                v-if="currentScreenshots.length > 1"
                type="button"
                class="modal__nav modal__nav--next"
                :disabled="imageIndex >= currentScreenshots.length - 1"
                aria-label="Next screenshot"
                @click="nextImage"
              >
                <ChevronRight :size="18" />
              </button>
            </div>

            <div v-if="currentScreenshots.length > 1" class="modal__thumbs">
              <button
                v-for="(shot, index) in currentScreenshots"
                :key="shot + index"
                type="button"
                class="modal__thumb"
                :class="{ 'modal__thumb--active': imageIndex === index }"
                @click="imageIndex = index"
              >
                <img :src="shot" :alt="'Thumbnail ' + (index + 1)" />
              </button>
            </div>
          </div>

          <p class="modal__desc">
            {{ project.fullDescription || project.description }}
          </p>

          <div v-if="project.components?.length" class="modal__components">
            <h4>Components</h4>
            <article
              v-for="component in project.components"
              :key="component.name"
              class="modal__component"
            >
              <h5>{{ component.name }}</h5>
              <p>{{ component.description }}</p>
              <div class="modal__tags">
                <span v-for="tech in component.technologies" :key="tech">{{ tech }}</span>
              </div>
            </article>
          </div>

          <div class="modal__tech">
            <h4>Technologies Used</h4>
            <div class="modal__tags modal__tags--accent">
              <span v-for="tech in project.tech" :key="tech">{{ tech }}</span>
            </div>
          </div>
        </div>

        <footer class="modal__footer">
          <button type="button" class="btn-outline" @click="emit('close')">Close</button>
          <a
            v-if="project.liveUrl"
            class="btn-primary"
            :href="project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live Project
          </a>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: grid;
  place-items: center;
  padding: 1.25rem;
  background: rgba(3, 3, 12, 0.72);
  backdrop-filter: blur(10px);
}

.modal__panel {
  width: min(920px, 100%);
  max-height: min(92svh, 920px);
  display: flex;
  flex-direction: column;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(12, 12, 22, 0.96);
  box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}

.modal__header,
.modal__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.modal__footer {
  border-bottom: none;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  justify-content: flex-end;
}

.modal__header h3 {
  font-size: 1.15rem;
}

.modal__close {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
  display: grid;
  place-items: center;
}

.modal__body {
  overflow-y: auto;
  padding: 1.15rem 1.25rem 1.35rem;
}

.modal__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.modal__tab {
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.modal__tab--active {
  color: white;
  border-color: transparent;
  background: var(--gradient-btn);
}

.modal__component-note {
  margin-bottom: 0.9rem;
  padding: 0.75rem 0.9rem;
  border-radius: 12px;
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.18);
  color: var(--text-muted);
  font-size: 0.86rem;
  line-height: 1.5;
}

.modal__component-note strong {
  color: #c084fc;
}

.modal__gallery {
  margin-bottom: 1.1rem;
}

.modal__stage {
  position: relative;
  height: min(420px, 48svh);
  border-radius: 12px;
  overflow: hidden;
  background: #0a0a14;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.modal__stage img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.modal__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 38px;
  height: 38px;
  border-radius: 999px;
  border: none;
  background: rgba(124, 58, 237, 0.9);
  color: white;
  display: grid;
  place-items: center;
}

.modal__nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.modal__nav--prev {
  left: 0.65rem;
}

.modal__nav--next {
  right: 0.65rem;
}

.modal__thumbs {
  display: flex;
  gap: 0.55rem;
  overflow-x: auto;
  padding-top: 0.75rem;
}

.modal__thumb {
  flex: 0 0 96px;
  height: 72px;
  padding: 0;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  background: #0a0a14;
}

.modal__thumb--active {
  border-color: #a855f7;
}

.modal__thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal__desc {
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 1.15rem;
}

.modal__components,
.modal__tech {
  margin-bottom: 1.1rem;
}

.modal__components h4,
.modal__tech h4 {
  font-size: 0.95rem;
  margin-bottom: 0.65rem;
}

.modal__component {
  padding: 0.85rem 0.95rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(255, 255, 255, 0.03);
  margin-bottom: 0.55rem;
}

.modal__component h5 {
  color: #c084fc;
  font-size: 0.9rem;
  margin-bottom: 0.35rem;
}

.modal__component p {
  color: var(--text-muted);
  font-size: 0.84rem;
  line-height: 1.5;
  margin-bottom: 0.55rem;
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.modal__tags span {
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--text-dim);
  font-size: 0.72rem;
}

.modal__tags--accent span {
  background: rgba(168, 85, 247, 0.16);
  border-color: rgba(168, 85, 247, 0.28);
  color: #e9d5ff;
}

@media (max-width: 640px) {
  .modal {
    padding: 0.5rem;
  }

  .modal__stage {
    height: 260px;
  }

  .modal__thumb {
    flex-basis: 78px;
    height: 58px;
  }
}
</style>
