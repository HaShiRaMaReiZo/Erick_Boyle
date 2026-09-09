<script setup lang="ts">
import {
  Home,
  User,
  Code2,
  FolderKanban,
  Briefcase,
  MessageSquareQuote,
  Mail,
  CodeXml,
  Share2,
  Send,
  X,
} from '@lucide/vue'
import { portfolio } from '@/data/portfolio'
import { computed } from 'vue'

defineProps<{
  activeId: string
  open: boolean
}>()

const emit = defineEmits<{
  navigate: [id: string]
  close: []
}>()

const iconMap = {
  home: Home,
  about: User,
  skills: Code2,
  projects: FolderKanban,
  experience: Briefcase,
  testimonials: MessageSquareQuote,
  contact: Mail,
} as const

const navItems = computed(() =>
  portfolio.nav.map((item) => ({
    ...item,
    icon: iconMap[item.id as keyof typeof iconMap],
  })),
)

const avatarFallback = computed(() => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#a855f7"/></linearGradient></defs><rect width="160" height="160" fill="#12121c"/><text x="50%" y="54%" text-anchor="middle" fill="url(#g)" font-family="sans-serif" font-size="42" font-weight="700">${portfolio.initials}</text></svg>`
  return 'data:image/svg+xml,' + encodeURIComponent(svg)
})

function onAvatarError(event: Event) {
  const img = event.target as HTMLImageElement
  img.src = avatarFallback.value
}

function onNav(id: string) {
  emit('navigate', id)
  emit('close')
}
</script>

<template>
  <aside
    class="sidebar"
    :class="{ 'sidebar--open': open }"
    aria-label="Primary"
  >
    <button
      type="button"
      class="sidebar__close"
      aria-label="Close menu"
      @click="emit('close')"
    >
      <X :size="20" />
    </button>

    <div class="sidebar__avatar-wrap">
      <div class="sidebar__avatar">
        <img :src="portfolio.avatar" :alt="portfolio.name" @error="onAvatarError" />
      </div>
      <p class="sidebar__name">{{ portfolio.name }}</p>
    </div>

    <nav class="sidebar__nav">
      <button
        v-for="item in navItems"
        :key="item.id"
        type="button"
        class="sidebar__link"
        :class="{ 'sidebar__link--active': activeId === item.id }"
        @click="onNav(item.id)"
      >
        <component :is="item.icon" :size="18" stroke-width="1.75" />
        <span>{{ item.label }}</span>
      </button>
    </nav>

    <div class="sidebar__social">
      <a
        :href="portfolio.social.github"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
        class="sidebar__social-btn"
      >
        <CodeXml :size="16" />
      </a>
      <a
        :href="portfolio.social.linkedin"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        class="sidebar__social-btn"
      >
        <Share2 :size="16" />
      </a>
      <a :href="portfolio.social.email" aria-label="Email" class="sidebar__social-btn">
        <Mail :size="16" />
      </a>
      <a
        :href="portfolio.social.telegram"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        class="sidebar__social-btn"
      >
        <Send :size="16" />
      </a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: var(--page-pad);
  left: var(--page-pad);
  bottom: var(--page-pad);
  width: var(--sidebar-w);
  z-index: 40;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.35rem 0.95rem 1.15rem;
  border-radius: 22px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(8, 8, 16, 0.78);
  backdrop-filter: blur(22px);
  -webkit-backdrop-filter: blur(22px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
}

.sidebar__close {
  display: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.04);
  color: var(--text);
}

.sidebar__avatar-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.35rem;
}

.sidebar__name {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  text-align: center;
  color: var(--text);
  line-height: 1.2;
}

.sidebar__avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  padding: 2.5px;
  background: var(--gradient-ring);
  box-shadow:
    0 0 0 1px rgba(99, 102, 241, 0.2),
    0 0 22px rgba(168, 85, 247, 0.4),
    0 0 40px rgba(34, 211, 238, 0.18);
}

.sidebar__avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  object-position: center 30%;
  background: var(--surface-solid);
  border: 2.5px solid #070712;
}

.sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.22rem;
  width: 100%;
  flex: 1;
  overflow-y: auto;
  padding-inline: 0.1rem;
}

.sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.68rem 0.95rem;
  border-radius: 999px;
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease;
}

.sidebar__link:hover {
  color: var(--text);
  background: rgba(255, 255, 255, 0.04);
}

.sidebar__link--active {
  color: white;
  background: linear-gradient(115deg, rgba(99, 102, 241, 0.35), rgba(168, 85, 247, 0.4));
  box-shadow:
    inset 0 0 0 1px rgba(192, 132, 252, 0.22),
    0 6px 20px rgba(124, 58, 237, 0.18);
}

.sidebar__social {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  width: 100%;
  justify-content: center;
}

.sidebar__social-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text-muted);
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    transform 0.2s ease;
}

.sidebar__social-btn:hover {
  color: white;
  border-color: rgba(168, 85, 247, 0.5);
  background: rgba(168, 85, 247, 0.12);
  transform: translateY(-2px);
}

@media (max-width: 1023px) {
  .sidebar {
    top: 0;
    left: 0;
    bottom: 0;
    width: min(288px, 86vw);
    border-radius: 0 20px 20px 0;
    transform: translateX(-105%);
    box-shadow: 20px 0 60px rgba(0, 0, 0, 0.5);
    padding: 1.5rem 1rem 1.25rem;
    padding-top: calc(1.5rem + env(safe-area-inset-top, 0px));
  }

  .sidebar--open {
    transform: translateX(0);
  }

  .sidebar__close {
    display: grid;
  }

  .sidebar__avatar {
    width: 84px;
    height: 84px;
  }

  .sidebar__name {
    font-size: 0.95rem;
  }
}
</style>
