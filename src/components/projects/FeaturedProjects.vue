<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
import ProjectCard from './ProjectCard.vue'

const emit = defineEmits<{
  navigate: [id: string]
}>()

const featured = computed(() => portfolio.projects.filter((p) => p.featured).slice(0, 4))
</script>

<template>
  <section class="featured section-pad">
    <div class="featured__head">
      <h2>Featured Projects</h2>
      <button type="button" class="featured__link" @click="emit('navigate', 'projects')">
        View All Projects
        <ArrowRight :size="16" />
      </button>
    </div>
    <div class="featured__grid">
      <ProjectCard v-for="project in featured" :key="project.id" :project="project" />
    </div>
  </section>
</template>

<style scoped>
.featured {
  padding-top: 0.85rem;
  padding-bottom: 2.25rem;
}

.featured__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
}

.featured__head h2 {
  font-size: clamp(1.35rem, 2.2vw, 1.7rem);
}

.featured__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: none;
  background: transparent;
  color: #60a5fa;
  font-size: 0.88rem;
  font-weight: 500;
  transition: color 0.2s ease, gap 0.2s ease;
}

.featured__link:hover {
  color: #93c5fd;
  gap: 0.55rem;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.95rem;
}

@media (max-width: 1200px) {
  .featured__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .featured__grid {
    grid-template-columns: 1fr;
  }
}
</style>
