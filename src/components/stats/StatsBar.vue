<script setup lang="ts">
import { Briefcase, FolderKanban, Users, Globe2 } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'

const icons = [Briefcase, FolderKanban, Users, Globe2]

const toneClass: Record<string, string> = {
  green: 'stat__icon--green',
  purple: 'stat__icon--purple',
  gold: 'stat__icon--gold',
  blue: 'stat__icon--blue',
}
</script>

<template>
  <div class="stats">
    <div
      v-for="(stat, i) in portfolio.stats"
      :key="stat.label"
      class="stat"
      :class="{ 'stat--divider': i > 0 }"
      v-reveal="'scale'"
      :data-reveal-delay="String(i + 1)"
    >
      <div class="stat__icon" :class="toneClass[stat.tone]">
        <component :is="icons[i]" :size="15" stroke-width="1.75" />
      </div>
      <div>
        <div class="stat__value">{{ stat.value }}</div>
        <div class="stat__label">{{ stat.label }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.2rem;
  margin: 0.15rem clamp(1rem, 2vw, 2rem) 0.45rem;
  padding: 0.65rem 0.3rem;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(10, 10, 20, 0.62);
  backdrop-filter: blur(14px);
}

.stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.2rem 0.65rem;
}

.stat--divider {
  border-left: 1px solid rgba(255, 255, 255, 0.07);
}

.stat__icon {
  width: 34px;
  height: 34px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.stat__icon--green {
  color: #4ade80;
  background: rgba(34, 197, 94, 0.12);
  box-shadow: 0 0 18px rgba(34, 197, 94, 0.14);
}

.stat__icon--purple {
  color: #c084fc;
  background: rgba(168, 85, 247, 0.12);
  box-shadow: 0 0 18px rgba(168, 85, 247, 0.14);
}

.stat__icon--gold {
  color: #facc15;
  background: rgba(234, 179, 8, 0.12);
  box-shadow: 0 0 18px rgba(234, 179, 8, 0.12);
}

.stat__icon--blue {
  color: #60a5fa;
  background: rgba(59, 130, 246, 0.12);
  box-shadow: 0 0 18px rgba(59, 130, 246, 0.14);
}

.stat__value {
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.1;
}

.stat__label {
  color: var(--text-dim);
  font-size: 0.7rem;
  margin-top: 0.1rem;
}

@media (max-width: 1100px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-inline: 1.25rem;
  }

  .stat--divider {
    border-left: none;
  }

  .stat:nth-child(even) {
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }
}

@media (max-width: 520px) {
  .stats {
    grid-template-columns: 1fr;
  }

  .stat:nth-child(even) {
    border-left: none;
  }
}
</style>
