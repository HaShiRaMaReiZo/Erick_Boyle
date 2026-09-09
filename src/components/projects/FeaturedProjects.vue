<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight } from '@lucide/vue'
import { portfolio, type Project } from '@/data/portfolio'
import ProjectCard from './ProjectCard.vue'
import ProjectDetailModal from './ProjectDetailModal.vue'

const emit = defineEmits<{
  navigate: [id: string]
}>()

const selected = ref<Project | null>(null)
const featured = computed(() => portfolio.projects.filter((p) => p.featured).slice(0, 4))

function openProject(project: Project) {
  selected.value = project
}
</script>

<template>
  <section class="featured section-pad">
    <div class="featured__head" v-reveal="'up'">
      <h2>Featured Projects</h2>
      <button type="button" class="featured__link" @click="emit('navigate', 'projects')">
        View All Projects
        <ArrowRight :size="16" />
      </button>
    </div>
    <div class="featured__grid">
      <div
        v-for="(project, i) in featured"
        :key="project.id"
        v-reveal="'up'"
        :data-reveal-delay="String((i % 4) + 1)"
      >
        <ProjectCard :project="project" @open="openProject" />
      </div>
    </div>

    <ProjectDetailModal :project="selected" @close="selected = null" />
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
  color: #c084fc;
  font-size: 0.88rem;
  font-weight: 500;
  transition: color 0.2s ease, gap 0.2s ease;
}

.featured__link:hover {
  color: #e9d5ff;
  gap: 0.55rem;
}

.featured__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
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
