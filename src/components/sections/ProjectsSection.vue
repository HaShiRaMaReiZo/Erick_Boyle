<script setup lang="ts">
import { computed, ref } from 'vue'
import { portfolio, type Project } from '@/data/portfolio'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectDetailModal from '@/components/projects/ProjectDetailModal.vue'

const filters = ['All Projects', 'Full Stack', 'Web Development', 'Mobile Apps'] as const
const active = ref<(typeof filters)[number]>('All Projects')
const selected = ref<Project | null>(null)

const filtered = computed(() => {
  if (active.value === 'All Projects') return portfolio.projects
  return portfolio.projects.filter((p) => p.category === active.value)
})

function openProject(project: Project) {
  selected.value = project
}

function closeProject() {
  selected.value = null
}
</script>

<template>
  <section id="projects" class="section-pad projects">
    <div class="projects__intro" v-reveal="'fade'">
      <h2>My Projects</h2>
      <p>
        Here are some of my recent works. A lot of projects are not listed here because they are
        owned by companies and clients.
      </p>
    </div>

    <div class="projects__filters" v-reveal="'up'">
      <button
        v-for="filter in filters"
        :key="filter"
        type="button"
        class="projects__filter"
        :class="{ 'projects__filter--active': active === filter }"
        @click="active = filter"
      >
        {{ filter }}
      </button>
    </div>

    <div class="projects__grid">
      <div
        v-for="(project, i) in filtered"
        :key="project.id"
        v-reveal="'scale'"
        :data-reveal-delay="String((i % 3) + 1)"
      >
        <ProjectCard :project="project" @open="openProject" />
      </div>
    </div>

    <ProjectDetailModal :project="selected" @close="closeProject" />
  </section>
</template>

<style scoped>
.projects__intro {
  margin-bottom: 1.5rem;
  max-width: 42rem;
}

.projects__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.projects__intro p {
  color: var(--text-muted);
  line-height: 1.6;
}

.projects__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-bottom: 1.5rem;
}

.projects__filter {
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-muted);
  font-size: 0.88rem;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.projects__filter:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.projects__filter--active {
  color: white;
  border-color: transparent;
  background: var(--gradient-btn);
  box-shadow: 0 8px 24px rgba(124, 58, 237, 0.3);
}

.projects__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

@media (max-width: 1100px) {
  .projects__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .projects__grid {
    grid-template-columns: 1fr;
  }
}
</style>
