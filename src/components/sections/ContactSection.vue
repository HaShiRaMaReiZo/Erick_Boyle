<script setup lang="ts">
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, Loader2 } from '@lucide/vue'
import { portfolio } from '@/data/portfolio'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
})

const isSubmitting = ref(false)
const status = ref<'idle' | 'success' | 'error' | 'config'>('idle')
const errorMessage = ref('')

async function onSubmit() {
  isSubmitting.value = true
  status.value = 'idle'
  errorMessage.value = ''

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (
    !serviceId ||
    !templateId ||
    !publicKey ||
    serviceId === 'YOUR_SERVICE_ID' ||
    templateId === 'YOUR_TEMPLATE_ID' ||
    publicKey === 'YOUR_PUBLIC_KEY'
  ) {
    isSubmitting.value = false
    status.value = 'config'
    errorMessage.value =
      'Email is not configured. Add VITE_EMAILJS_* keys in .env.local (or Vercel env vars).'
    return
  }

  try {
    emailjs.init(publicKey)
    await emailjs.send(serviceId, templateId, {
      name: form.name || 'Anonymous',
      email: form.email,
      title: form.subject || 'Contact Form Submission',
      message: form.message,
      time: new Date().toLocaleString(),
    })

    status.value = 'success'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error) {
    console.error('EmailJS Error:', error)
    status.value = 'error'
    errorMessage.value = 'Something went wrong. Please try again or email me directly.'
  } finally {
    isSubmitting.value = false
  }
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
          <input
            v-model="form.name"
            name="name"
            type="text"
            required
            autocomplete="name"
            placeholder="Your name"
            :disabled="isSubmitting"
          />
        </label>
        <label>
          <span>Email *</span>
          <input
            v-model="form.email"
            name="email"
            type="email"
            required
            autocomplete="email"
            placeholder="you@email.com"
            :disabled="isSubmitting"
          />
        </label>
        <label>
          <span>Subject *</span>
          <input
            v-model="form.subject"
            name="subject"
            type="text"
            required
            placeholder="Project idea"
            :disabled="isSubmitting"
          />
        </label>
        <label>
          <span>Message *</span>
          <textarea
            v-model="form.message"
            name="message"
            required
            rows="5"
            placeholder="Tell me about your project..."
            :disabled="isSubmitting"
          />
        </label>

        <button type="submit" class="btn-primary contact__submit" :disabled="isSubmitting">
          <Loader2 v-if="isSubmitting" :size="16" class="contact__spin" />
          <Send v-else :size="16" />
          {{ isSubmitting ? 'Sending…' : 'Send Message' }}
        </button>

        <p v-if="status === 'success'" class="contact__hint contact__hint--ok" role="status">
          Message sent. I'll get back to you soon.
        </p>
        <p
          v-else-if="status === 'error' || status === 'config'"
          class="contact__hint contact__hint--err"
          role="alert"
        >
          {{ errorMessage }}
        </p>
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
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
  resize: vertical;
}

.contact__form input:disabled,
.contact__form textarea:disabled {
  opacity: 0.65;
  cursor: not-allowed;
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

.contact__submit:disabled {
  opacity: 0.75;
  cursor: wait;
  transform: none;
}

.contact__spin {
  animation: contact-spin 0.9s linear infinite;
}

@keyframes contact-spin {
  to {
    transform: rotate(360deg);
  }
}

.contact__hint {
  font-size: 0.85rem;
}

.contact__hint--ok {
  color: #4ade80;
}

.contact__hint--err {
  color: #f87171;
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
