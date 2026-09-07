<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const canvasRef = ref<HTMLCanvasElement | null>(null)

let raf = 0
let ctx: CanvasRenderingContext2D | null = null
let stars: { x: number; y: number; r: number; a: number; s: number }[] = []
let w = 0
let h = 0

function resize() {
  const canvas = canvasRef.value
  if (!canvas) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  w = window.innerWidth
  h = window.innerHeight
  canvas.width = Math.floor(w * dpr)
  canvas.height = Math.floor(h * dpr)
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  ctx = canvas.getContext('2d')
  if (!ctx) return
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = Math.floor((w * h) / 4500)
  stars = Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.4 + 0.3,
    a: Math.random() * 0.7 + 0.2,
    s: Math.random() * 0.02 + 0.005,
  }))
}

function draw(t: number) {
  if (!ctx) return
  ctx.clearRect(0, 0, w, h)

  for (const star of stars) {
    const twinkle = 0.55 + Math.sin(t * star.s + star.x) * 0.45
    ctx.beginPath()
    ctx.fillStyle = `rgba(230, 235, 255, ${star.a * twinkle})`
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2)
    ctx.fill()
  }

  raf = requestAnimationFrame(draw)
}

onMounted(() => {
  resize()
  raf = requestAnimationFrame(draw)
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  cancelAnimationFrame(raf)
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="space-bg" aria-hidden="true">
    <div class="space-bg__nebula space-bg__nebula--a" />
    <div class="space-bg__nebula space-bg__nebula--b" />
    <div class="space-bg__nebula space-bg__nebula--c" />
    <canvas ref="canvasRef" class="space-bg__stars" />

    <!-- Floating asteroids matching the video scene -->
    <svg class="space-bg__rock space-bg__rock--1" viewBox="0 0 120 90" fill="none">
      <path
        d="M18 48 L34 18 L62 10 L92 22 L108 48 L96 72 L68 84 L36 78 L14 62 Z"
        fill="#1a1a28"
        stroke="#2a2a3c"
        stroke-width="2"
      />
      <path d="M40 34 L58 28 L70 42 L52 50 Z" fill="#0e0e18" opacity="0.7" />
    </svg>
    <svg class="space-bg__rock space-bg__rock--2" viewBox="0 0 90 70" fill="none">
      <path
        d="M12 36 L28 12 L58 8 L78 30 L70 54 L42 64 L16 52 Z"
        fill="#161622"
        stroke="#2c2c40"
        stroke-width="2"
      />
    </svg>
    <svg class="space-bg__rock space-bg__rock--3" viewBox="0 0 100 80" fill="none">
      <path
        d="M10 40 L26 14 L54 8 L82 24 L90 48 L72 68 L40 74 L14 58 Z"
        fill="#141420"
        stroke="#303048"
        stroke-width="2"
      />
      <path d="M34 30 L48 24 L56 38 L40 42 Z" fill="#0c0c14" opacity="0.65" />
    </svg>
    <svg class="space-bg__rock space-bg__rock--4" viewBox="0 0 70 55" fill="none">
      <path
        d="M8 28 L20 10 L44 8 L60 24 L54 42 L30 48 L10 38 Z"
        fill="#181824"
        stroke="#2a2a3a"
        stroke-width="1.5"
      />
    </svg>
    <svg class="space-bg__rock space-bg__rock--5" viewBox="0 0 110 85" fill="none">
      <path
        d="M16 44 L30 16 L60 10 L88 26 L98 50 L80 72 L46 78 L18 62 Z"
        fill="#12121c"
        stroke="#282838"
        stroke-width="2"
      />
    </svg>
    <svg class="space-bg__rock space-bg__rock--6" viewBox="0 0 60 48" fill="none">
      <path
        d="M6 24 L16 8 L38 6 L52 20 L46 36 L24 42 L8 32 Z"
        fill="#1c1c2a"
        stroke="#323248"
        stroke-width="1.5"
      />
    </svg>
  </div>
</template>

<style scoped>
.space-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
  /* Same deep navy as the video so layers feel continuous */
  background: #060814;
}

.space-bg__nebula {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
}

/* Soft nebula blobs — blue-forward, aligned with hero video halo */
.space-bg__nebula--a {
  width: min(75vw, 860px);
  height: min(75vw, 860px);
  top: -12%;
  right: -2%;
  background: radial-gradient(
    circle,
    rgba(56, 189, 248, 0.26) 0%,
    rgba(37, 99, 235, 0.14) 40%,
    transparent 68%
  );
}

.space-bg__nebula--b {
  width: min(60vw, 680px);
  height: min(60vw, 680px);
  top: 28%;
  left: 18%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.16), transparent 70%);
}

.space-bg__nebula--c {
  width: min(55vw, 580px);
  height: min(55vw, 580px);
  bottom: -10%;
  right: 28%;
  background: radial-gradient(
    circle,
    rgba(14, 165, 233, 0.12) 0%,
    rgba(99, 102, 241, 0.08) 45%,
    transparent 72%
  );
}

.space-bg__stars {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.space-bg__rock {
  position: absolute;
  opacity: 0.85;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.45));
  animation: rock-float 9s ease-in-out infinite;
}

.space-bg__rock--1 {
  width: 92px;
  top: 18%;
  right: 8%;
  animation-duration: 11s;
}

.space-bg__rock--2 {
  width: 64px;
  top: 58%;
  right: 18%;
  animation-duration: 8s;
  animation-delay: -2s;
  opacity: 0.7;
}

.space-bg__rock--3 {
  width: 78px;
  top: 28%;
  left: calc(var(--sidebar-w) + 8%);
  animation-duration: 10s;
  animation-delay: -4s;
}

.space-bg__rock--4 {
  width: 48px;
  top: 72%;
  left: calc(var(--sidebar-w) + 18%);
  animation-duration: 7s;
  animation-delay: -1s;
  opacity: 0.65;
}

.space-bg__rock--5 {
  width: 110px;
  bottom: 12%;
  right: 28%;
  animation-duration: 12s;
  animation-delay: -3s;
  opacity: 0.55;
}

.space-bg__rock--6 {
  width: 40px;
  top: 12%;
  right: 28%;
  animation-duration: 6.5s;
  animation-delay: -5s;
  opacity: 0.75;
}

@keyframes rock-float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-14px) rotate(4deg);
  }
}

@media (max-width: 1023px) {
  .space-bg__rock--3,
  .space-bg__rock--4 {
    left: 6%;
  }

  .space-bg__rock--1 {
    width: 64px;
  }

  .space-bg__rock--5 {
    width: 72px;
  }
}
</style>
