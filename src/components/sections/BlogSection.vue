<script setup lang="ts">
import { ArrowUpRight } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
</script>

<template>
  <section id="blog" class="section-pad blog">
    <div class="blog__intro">
      <h2>Blog</h2>
      <p>Notes and write-ups from building web and mobile products.</p>
    </div>

    <div class="blog__grid">
      <article v-for="post in portfolio.blog" :key="post.title" class="blog__card glass">
        <div class="blog__meta">
          <span class="blog__tag">{{ post.tag }}</span>
          <span>{{ post.date }}</span>
        </div>
        <h3>{{ post.title }}</h3>
        <p>{{ post.excerpt }}</p>
        <span class="blog__more">
          Read more
          <ArrowUpRight :size="16" />
        </span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.blog__intro {
  margin-bottom: 2rem;
}

.blog__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.blog__intro p {
  color: var(--text-muted);
}

.blog__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.1rem;
}

.blog__card {
  padding: 1.4rem;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.blog__card:hover {
  border-color: rgba(168, 85, 247, 0.35);
  transform: translateY(-3px);
}

.blog__meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-dim);
  font-size: 0.8rem;
}

.blog__tag {
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(59, 130, 246, 0.12);
  color: var(--blue-bright);
  font-weight: 500;
}

.blog__card h3 {
  font-size: 1.1rem;
  line-height: 1.35;
}

.blog__card p {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
  flex: 1;
}

.blog__more {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--purple);
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 0.25rem;
}

@media (max-width: 900px) {
  .blog__grid {
    grid-template-columns: 1fr;
  }
}
</style>
