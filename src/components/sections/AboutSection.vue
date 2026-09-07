<script setup lang="ts">
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="about" class="section-pad about">
    <div class="about__intro">
      <h2>{{ portfolio.about.title }}</h2>
      <p>{{ portfolio.about.subtitle }}</p>
    </div>

    <div class="about__grid">
      <div class="about__story glass">
        <h3>{{ portfolio.about.storyTitle }}</h3>
        <p v-for="(para, i) in portfolio.about.story" :key="i">{{ para }}</p>
      </div>

      <div class="about__highlights">
        <article
          v-for="item in portfolio.about.highlights"
          :key="item.title"
          class="about__card glass"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about__intro {
  margin-bottom: 2rem;
  max-width: 40rem;
}

.about__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.about__intro p {
  color: var(--text-muted);
}

.about__grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 1.25rem;
}

.about__story {
  padding: 1.75rem;
  border-radius: 20px;
}

.about__story h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
}

.about__story p {
  color: var(--text-muted);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.about__story p:last-child {
  margin-bottom: 0;
}

.about__highlights {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about__card {
  padding: 1.25rem 1.4rem;
  border-radius: 16px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.about__card:hover {
  border-color: rgba(168, 85, 247, 0.35);
  transform: translateX(4px);
}

.about__card h4 {
  font-size: 1.05rem;
  margin-bottom: 0.4rem;
}

.about__card p {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

@media (max-width: 900px) {
  .about__grid {
    grid-template-columns: 1fr;
  }
}
</style>
