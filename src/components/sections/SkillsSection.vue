<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="skills" class="section-pad skills">
    <div class="skills__intro">
      <h2>Technical Skills</h2>
      <p>Technologies I use to ship reliable web and mobile products.</p>
    </div>

    <div class="skills__grid">
      <div v-for="skill in portfolio.skills" :key="skill.name" class="skill glass">
        <div class="skill__head">
          <span>{{ skill.name }}</span>
          <span class="skill__pct">{{ skill.level }}%</span>
        </div>
        <div class="skill__track">
          <div class="skill__fill" :style="{ width: `${skill.level}%` }" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills__intro {
  margin-bottom: 2rem;
}

.skills__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.skills__intro p {
  color: var(--text-muted);
}

.skills__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.skill {
  padding: 1.1rem 1.25rem;
  border-radius: 14px;
}

.skill__head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.7rem;
  font-size: 0.95rem;
  font-weight: 500;
}

.skill__pct {
  color: var(--text-dim);
  font-size: 0.85rem;
}

.skill__track {
  height: 7px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.skill__fill {
  height: 100%;
  border-radius: 999px;
  background: var(--gradient-btn);
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.45);
  transition: width 0.8s ease;
}

@media (max-width: 720px) {
  .skills__grid {
    grid-template-columns: 1fr;
  }
}
</style>
