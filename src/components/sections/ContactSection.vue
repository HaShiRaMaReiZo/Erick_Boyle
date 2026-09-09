<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Mail, Phone, MapPin, Send } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

function onSubmit() {
  const subject = encodeURIComponent(form.subject || 'Portfolio inquiry')
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`,
  )
  window.location.href = `mailto:${portfolio.contact.email}?subject=${subject}&body=${body}`
  submitted.value = true
}
</script>

<template>
  <section id="contact" class="section-pad contact">
    <div class="contact__intro" v-reveal="'fade'">
      <h2>Get In Touch</h2>
      <p>Ready to start your next project? Let's work together.</p>
    </div>

    <div class="contact__grid">
      <form class="contact__form glass" v-reveal="'left'" @submit.prevent="onSubmit">
        <h3>Send me a message</h3>

        <label>
          <span>Name *</span>
          <input v-model="form.name" type="text" required placeholder="Your name" />
        </label>
        <label>
          <span>Email *</span>
          <input v-model="form.email" type="email" required placeholder="you@email.com" />
        </label>
        <label>
          <span>Subject *</span>
          <input v-model="form.subject" type="text" required placeholder="Project idea" />
        </label>
        <label>
          <span>Message *</span>
          <textarea
            v-model="form.message"
            required
            rows="5"
            placeholder="Tell me about your project..."
          />
        </label>

        <button type="submit" class="btn-primary contact__submit">
          <Send :size="16" />
          Send Message
        </button>
        <p v-if="submitted" class="contact__hint">Opening your email client…</p>
      </form>

      <div class="contact__aside" v-reveal="'right'" data-reveal-delay="2">
        <div class="contact__info glass">
          <h3>Contact Information</h3>
          <a :href="`mailto:${portfolio.contact.email}`" class="contact__row">
            <Mail :size="18" />
            <div>
              <strong>Email</strong>
              <span>{{ portfolio.contact.email }}</span>
            </div>
          </a>
          <a :href="`tel:${portfolio.contact.phone.replace(/\s/g, '')}`" class="contact__row">
            <Phone :size="18" />
            <div>
              <strong>Phone</strong>
              <span>{{ portfolio.contact.phone }}</span>
            </div>
          </a>
          <div class="contact__row">
            <MapPin :size="18" />
            <div>
              <strong>Location</strong>
              <span>{{ portfolio.contact.location }}</span>
            </div>
          </div>
        </div>

        <div class="contact__note glass">
          <h4>Quick Response</h4>
          <p>I typically respond to messages within 24 hours during business days.</p>
        </div>
      </div>
    </div>

    <footer class="contact__footer" v-reveal="'fade'">
      © {{ new Date().getFullYear() }} {{ portfolio.name }}. All rights reserved.
    </footer>
  </section>
</template>

<style scoped>
.contact__intro {
  margin-bottom: 2rem;
}

.contact__intro h2 {
  font-size: clamp(1.6rem, 2.5vw, 2rem);
  margin-bottom: 0.5rem;
}

.contact__intro p {
  color: var(--text-muted);
}

.contact__grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 1.25rem;
}

.contact__form {
  padding: 1.75rem;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__form h3 {
  font-size: 1.2rem;
  margin-bottom: 0.25rem;
}

.contact__form label {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  font-size: 0.88rem;
  color: var(--text-muted);
}

.contact__form input,
.contact__form textarea {
  width: 100%;
  padding: 0.8rem 0.95rem;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.03);
  color: var(--text);
  font: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  resize: vertical;
}

.contact__form input:focus,
.contact__form textarea:focus {
  border-color: rgba(168, 85, 247, 0.55);
  box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.15);
}

.contact__submit {
  align-self: flex-start;
  margin-top: 0.35rem;
}

.contact__hint {
  color: var(--text-dim);
  font-size: 0.85rem;
}

.contact__aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact__info {
  padding: 1.5rem;
  border-radius: 18px;
}

.contact__info h3 {
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
}

.contact__row {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
  padding: 0.75rem 0;
  color: var(--text-muted);
  border-bottom: 1px solid var(--border);
}

.contact__row:last-child {
  border-bottom: none;
}

.contact__row strong {
  display: block;
  color: var(--text);
  font-size: 0.9rem;
  margin-bottom: 0.15rem;
}

.contact__row span {
  font-size: 0.88rem;
}

.contact__row :deep(svg) {
  color: var(--purple);
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.contact__note {
  padding: 1.35rem 1.5rem;
  border-radius: 16px;
}

.contact__note h4 {
  margin-bottom: 0.45rem;
  font-size: 1rem;
}

.contact__note p {
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.55;
}

.contact__footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  text-align: center;
  color: var(--text-dim);
  font-size: 0.88rem;
}

@media (max-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr;
  }
}
</style>
