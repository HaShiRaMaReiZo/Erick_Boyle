<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  src: string
}>()

const failed = ref(false)

function onError() {
  failed.value = true
}
</script>

<template>
  <div class="hero-video">
    <div class="hero-video__glow" aria-hidden="true" />

    <div class="hero-video__frame">
      <video
        v-if="!failed"
        class="hero-video__media"
        :src="src"
        autoplay
        muted
        loop
        playsinline
        @error="onError"
      />
      <img
        v-else
        class="hero-video__media"
        src="/images/hero-frame.jpg"
        alt=""
      />
    </div>

    <svg class="hero-video__debris hero-video__debris--a" viewBox="0 0 80 60" fill="none" aria-hidden="true">
      <path
        d="M10 30 L24 10 L50 8 L70 26 L62 46 L34 54 L12 42 Z"
        fill="#151522"
        stroke="#2c2c40"
        stroke-width="1.5"
      />
    </svg>
    <svg class="hero-video__debris hero-video__debris--b" viewBox="0 0 60 48" fill="none" aria-hidden="true">
      <path
        d="M8 24 L20 8 L42 6 L54 22 L46 38 L24 42 L8 32 Z"
        fill="#12121c"
        stroke="#303048"
        stroke-width="1.5"
      />
    </svg>
    <svg class="hero-video__debris hero-video__debris--c" viewBox="0 0 50 40" fill="none" aria-hidden="true">
      <path
        d="M6 20 L16 6 L34 5 L44 18 L38 32 L18 35 L6 26 Z"
        fill="#1a1a28"
        stroke="#2a2a3c"
        stroke-width="1.25"
      />
    </svg>
  </div>
</template>

<style scoped>
.hero-video {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: clamp(400px, 54svh, 540px);
  overflow: visible;
}

/* Ambient glow matches video halo so scene + page share one light */
.hero-video__glow {
  position: absolute;
  left: 50%;
  top: 46%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, transparent 55%),
    radial-gradient(circle at 40% 50%, rgba(99, 102, 241, 0.16) 0%, transparent 50%),
    radial-gradient(circle at 70% 35%, rgba(37, 99, 235, 0.18) 0%, transparent 48%);
  filter: blur(40px);
  pointer-events: none;
  z-index: 0;
}

.hero-video__frame {
  position: absolute;
  /* Bleed past the box — feather happens before any hard edge */
  inset: -6% -10% -8% -14%;
  z-index: 1;
  /*
    Soft radial — slightly more height so the island stays inside the solid core.
  */
  -webkit-mask-image: radial-gradient(
    ellipse 70% 78% at 55% 48%,
    #000 0%,
    #000 36%,
    rgba(0, 0, 0, 0.92) 50%,
    rgba(0, 0, 0, 0.55) 64%,
    rgba(0, 0, 0, 0.2) 78%,
    rgba(0, 0, 0, 0.05) 88%,
    transparent 96%
  );
  mask-image: radial-gradient(
    ellipse 70% 78% at 55% 48%,
    #000 0%,
    #000 36%,
    rgba(0, 0, 0, 0.92) 50%,
    rgba(0, 0, 0, 0.55) 64%,
    rgba(0, 0, 0, 0.2) 78%,
    rgba(0, 0, 0, 0.05) 88%,
    transparent 96%
  );
}

.hero-video__media {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Mid framing — keep the ring AND the floating island/waterfall */
  object-position: center 32%;
  transform: none;
}

.hero-video__debris {
  position: absolute;
  z-index: 2;
  pointer-events: none;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
  animation: debris-float 8s ease-in-out infinite;
}

.hero-video__debris--a {
  width: 52px;
  left: 2%;
  top: 68%;
  animation-delay: -1.5s;
}

.hero-video__debris--b {
  width: 38px;
  right: 4%;
  top: 16%;
  animation-delay: -3s;
  opacity: 0.85;
}

.hero-video__debris--c {
  width: 30px;
  right: 16%;
  bottom: 12%;
  animation-delay: -5s;
  opacity: 0.75;
}

@keyframes debris-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
}

@media (max-width: 1100px) {
  .hero-video {
    min-height: 400px;
  }
}

@media (max-width: 640px) {
  .hero-video {
    min-height: 320px;
  }

  .hero-video__debris--a {
    width: 36px;
  }
}
</style>
