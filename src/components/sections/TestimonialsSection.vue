<script setup lang="ts">
import { Quote } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="testimonials" class="section-pad testimonials">
    <div class="testimonials__intro" v-reveal="'fade'">
      <h2>Testimonials</h2>
      <p>What collaborators and clients say about working together.</p>
    </div>

    <div class="testimonials__grid">
      <article
        v-for="(item, i) in portfolio.testimonials"
        :key="i"
        class="testimonials__card glass"
        v-reveal="'up'"
        :data-reveal-delay="String(i + 1)"
      >
        <Quote :size="22" class="testimonials__quote-icon" />
        <p class="testimonials__quote">“{{ item.quote }}”</p>
        <div class="testimonials__author">
          <strong>{{ item.author }}</strong>
          <span>{{ item.role }}</span>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.testimonials__intro {
  margin-bottom: 2rem;
}

.testimonials__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.testimonials__intro p {
  color: var(--text-muted);
}

.testimonials__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.15rem;
}

.testimonials__card {
  padding: 1.6rem;
  border-radius: 18px;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.testimonials__card:hover {
  border-color: rgba(59, 130, 246, 0.35);
  transform: translateY(-3px);
}

.testimonials__quote-icon {
  color: var(--purple);
  margin-bottom: 1rem;
  opacity: 0.85;
}

.testimonials__quote {
  color: var(--text);
  line-height: 1.7;
  margin-bottom: 1.25rem;
  font-size: 1.02rem;
}

.testimonials__author {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.testimonials__author strong {
  font-weight: 600;
}

.testimonials__author span {
  color: var(--text-dim);
  font-size: 0.88rem;
}

@media (max-width: 720px) {
  .testimonials__grid {
    grid-template-columns: 1fr;
  }
}
</style>
