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
    <!-- Soft ambient glow pulled from the video's purple/cyan ring -->
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

    <!-- Local asteroids to continue the video scene outside the soft mask -->
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
  min-height: clamp(360px, 50svh, 520px);
  overflow: visible;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.hero-video__glow {
  position: absolute;
  left: 50%;
  top: 38%;
  width: 92%;
  height: 92%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background:
    radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, transparent 58%),
    radial-gradient(circle at 58% 32%, rgba(124, 58, 237, 0.12) 0%, transparent 50%);
  filter: blur(32px);
  pointer-events: none;
  z-index: 0;
}

.hero-video__frame {
  position: relative;
  z-index: 1;
  width: min(100%, 780px);
  /* Match source video aspect so the full ring is never cropped */
  aspect-ratio: 960 / 820;
  max-height: none;
  margin-top: 0;
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 2%,
      rgba(0, 0, 0, 0.75) 5%,
      #000 10%,
      #000 88%,
      transparent 100%
    );
  -webkit-mask-composite: source-in;
  mask-image:
    linear-gradient(to right, transparent 0%, #000 14%, #000 86%, transparent 100%),
    linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 2%,
      rgba(0, 0, 0, 0.75) 5%,
      #000 10%,
      #000 88%,
      transparent 100%
    );
  mask-composite: intersect;
}

.hero-video__media {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* Moderate top blend — hides letterbox without crushing the ring */
.hero-video__frame::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 18%;
  pointer-events: none;
  z-index: 2;
  background: linear-gradient(
    to bottom,
    rgba(7, 7, 26, 0.82) 0%,
    rgba(7, 7, 26, 0.4) 40%,
    rgba(7, 7, 26, 0.12) 70%,
    transparent 100%
  );
  backdrop-filter: blur(9px);
  -webkit-backdrop-filter: blur(9px);
  mask-image: linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, #000 42%, transparent 100%);
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
  top: 66%;
  animation-delay: -1.5s;
}

.hero-video__debris--b {
  width: 38px;
  right: 4%;
  top: 12%;
  animation-delay: -3s;
  opacity: 0.85;
}

.hero-video__debris--c {
  width: 30px;
  right: 16%;
  bottom: 14%;
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

@media (max-width: 1023px) {
  .hero-video {
    position: absolute;
    inset: 0;
    min-height: 100%;
    height: 100%;
    width: 100%;
    overflow: hidden;
    align-items: stretch;
    justify-content: stretch;
  }

  .hero-video__glow {
    top: 45%;
    width: 120%;
    height: 120%;
    opacity: 0.7;
  }

  .hero-video__frame {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    max-width: none;
    aspect-ratio: auto;
    margin: 0;
    -webkit-mask-image: none;
    mask-image: none;
  }

  .hero-video__frame::after {
    display: none;
  }

  .hero-video__media {
    object-fit: cover;
    object-position: center top;
    transform: scale(1.15) translateY(-2%);
    transform-origin: center top;
  }

  .hero-video__debris {
    display: none;
  }
}
</style>
