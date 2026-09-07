<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="experience" class="section-pad experience">
    <div class="experience__intro">
      <h2>Experience</h2>
      <p>A snapshot of roles and work that shaped how I build products.</p>
    </div>

    <div class="experience__timeline">
      <article
        v-for="item in portfolio.experience"
        :key="item.role + item.period"
        class="experience__item glass"
      >
        <div class="experience__period">{{ item.period }}</div>
        <h3>{{ item.role }}</h3>
        <div class="experience__company">{{ item.company }}</div>
        <p>{{ item.description }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.experience__intro {
  margin-bottom: 2rem;
}

.experience__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.experience__intro p {
  color: var(--text-muted);
}

.experience__timeline {
  display: grid;
  gap: 1rem;
  position: relative;
}

.experience__item {
  padding: 1.5rem 1.6rem;
  border-radius: 18px;
  position: relative;
  overflow: hidden;
}

.experience__item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, #3b82f6, #a855f7);
}

.experience__period {
  color: var(--blue-bright);
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.55rem;
}

.experience__item h3 {
  font-size: 1.15rem;
  margin-bottom: 0.25rem;
}

.experience__company {
  color: var(--text-dim);
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.experience__item p {
  color: var(--text-muted);
  line-height: 1.6;
}
</style>
