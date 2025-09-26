<template>
  <div class="contact-page">
    <!-- Hero Header -->
    <section class="contact-hero">
      <div class="hero-content">
        <h1 class="hero-title">Get In Touch</h1>
        <p class="hero-subtitle">We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
      </div>
      <div class="hero-decoration">
        <div class="floating-shape shape-1"></div>
        <div class="floating-shape shape-2"></div>
        <div class="floating-shape shape-3"></div>
      </div>
    </section>

    <section class="contact-content">
      <div class="contact-container">
        <!-- Contact Info Card -->
        <div class="contact-info-card">
          <div class="card-header">
            <h2>Let's Connect</h2>
            <p>Choose your preferred way to reach out</p>
          </div>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="method-content">
                <h3>Phone</h3>
                <p>123-456-7890</p>
                <span class="method-time">Mon-Fri 9am-5pm</span>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="method-content">
                <h3>Email</h3>
                <p>info@mysite.com</p>
                <span class="method-time">We reply within 24 hours</span>
              </div>
            </div>

            <div class="contact-method">
              <div class="method-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="method-content">
                <h3>Office</h3>
                <p>123 Main Street<br>City, State 12345</p>
                <span class="method-time">Visit by appointment</span>
              </div>
            </div>
          </div>

          <div class="social-section">
            <h3>Follow Us</h3>
            <div class="social-links">
              <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.11 0c-2.5 0-4.51 2.01-4.51 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 0 1 0 20.29a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          <div class="brand-footer">
            <h2>Inner Pieces</h2>
            <p class="copyright">© 2035 by Inner Pieces. All rights reserved.</p>
          </div>
        </div>

        <!-- Contact Form Card -->
        <div class="contact-form-card">
          <div class="form-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and we'll get back to you shortly</p>
          </div>

          <form class="modern-contact-form" @submit.prevent="sendContact">
            <div class="form-grid">
              <div class="form-group">
                <div class="input-wrapper">
                  <input v-model="firstName" type="text" placeholder=" " required id="firstName" />
                  <label for="firstName">First Name *</label>
                  <div class="input-border"></div>
                </div>
              </div>
              
              <div class="form-group">
                <div class="input-wrapper">
                  <input v-model="lastName" type="text" placeholder=" " required id="lastName" />
                  <label for="lastName">Last Name *</label>
                  <div class="input-border"></div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <input v-model="email" type="email" placeholder=" " required id="email" />
                <label for="email">Email Address *</label>
                <div class="input-border"></div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <select v-model="subject" required id="subject">
                  <option value="" disabled>Select a topic</option>
                  <option value="general">General Inquiry</option>
                  <option value="collaboration">Collaboration</option>
                  <option value="feedback">Feedback</option>
                  <option value="support">Support</option>
                </select>
                <label for="subject">Subject *</label>
                <div class="input-border"></div>
              </div>
            </div>

            <div class="form-group">
              <div class="input-wrapper">
                <textarea v-model="messageText" placeholder=" " required rows="6" id="message"></textarea>
                <label for="message">Your Message *</label>
                <div class="input-border"></div>
              </div>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-btn" :class="{ 'loading': isSubmitting }">
                <span v-if="!isSubmitting" class="btn-content">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
                  </svg>
                  Send Message
                </span>
                <span v-else class="btn-loading">
                  <div class="spinner"></div>
                  Sending...
                </span>
              </button>
            </div>
          </form>

          <!-- Success/Error Message -->
          <transition name="message-fade">
            <div v-if="responseMsg" class="response-message" :class="{ 'success': isSuccess, 'error': !isSuccess }">
              <div class="message-icon">
                <svg v-if="isSuccess" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <circle cx="12" cy="12" r="10"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
              </div>
              <div class="message-content">
                <h4>{{ isSuccess ? 'Message Sent!' : 'Oops!' }}</h4>
                <p>{{ responseMsg }}</p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <div class="faq-container">
        <div class="faq-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to questions you may have</p>
        </div>
        
        <div class="faq-grid">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h3>{{ faq.question }}</h3>
              <svg class="faq-icon" :class="{ 'rotated': faq.open }" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6,9 12,15 18,9"/>
              </svg>
            </div>
            <transition name="faq-slide">
              <div v-if="faq.open" class="faq-answer">
                <p>{{ faq.answer }}</p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const subject = ref('')
const messageText = ref('')
const responseMsg = ref('')
const isSubmitting = ref(false)
const isSuccess = ref(false)

const faqs = ref([
  {
    question: "How quickly do you respond to messages?",
    answer: "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call us directly.",
    open: false
  },
  {
    question: "What's the best way to reach you?",
    answer: "Email is usually the quickest way to get in touch. For immediate assistance, you can also call us during business hours.",
    open: false
  },
  {
    question: "Do you offer consultations?",
    answer: "Yes, we offer free initial consultations. Please mention this in your message and we'll schedule a time that works for you.",
    open: false
  },
  {
    question: "Can I visit your office?",
    answer: "Absolutely! We welcome visitors by appointment. Please contact us in advance to ensure someone will be available to meet with you.",
    open: false
  }
])

function toggleFaq(index) {
  faqs.value[index].open = !faqs.value[index].open
  // Close other FAQs
  faqs.value.forEach((faq, i) => {
    if (i !== index) faq.open = false
  })
}

async function sendContact() {
  if (!firstName.value || !lastName.value || !email.value || !messageText.value) {
    responseMsg.value = 'Please fill in all required fields.'
    isSuccess.value = false
    return
  }

  isSubmitting.value = true
  
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: `${firstName.value} ${lastName.value}`, 
        email: email.value, 
        subject: subject.value,
        message: messageText.value 
      })
    })
    
    const data = await res.json()
    
    if (!res.ok) throw new Error(data.error || 'Submission failed')
    
    responseMsg.value = data.message || 'Thank you for reaching out! We\'ll get back to you soon.'
    isSuccess.value = true
    
    // Reset form
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    subject.value = ''
    messageText.value = ''
    
  } catch (e) {
    responseMsg.value = e.message || 'Something went wrong. Please try again.'
    isSuccess.value = false
  } finally {
    isSubmitting.value = false
    
    // Clear message after 5 seconds
    setTimeout(() => {
      responseMsg.value = ''
    }, 5000)
  }
}

onMounted(() => {
  // Add some entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  })

  document.querySelectorAll('.contact-method, .faq-item').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* Page Layout */
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

/* Hero Section */
.contact-hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 6rem 2rem 4rem;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  opacity: 0.9;
  font-weight: 300;
  max-width: 600px;
  margin: 0 auto;
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-shape {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.shape-1 {
  width: 60px;
  height: 60px;
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.shape-3 {
  width: 40px;
  height: 40px;
  top: 30%;
  right: 30%;
  animation-delay: 4s;
}

/* Main Content */
.contact-content {
  padding: 4rem 2rem;
  margin-top: -2rem;
  position: relative;
  z-index: 3;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

/* Contact Info Card */
.contact-info-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.8);
}

.card-header {
  margin-bottom: 2rem;
}

.card-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.card-header p {
  color: #666;
  font-size: 1rem;
}

.contact-methods {
  margin-bottom: 2.5rem;
}

.contact-method {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 16px;
  margin-bottom: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0;
  transform: translateX(-20px);
}

.contact-method.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.contact-method:hover {
  background: rgba(102, 126, 234, 0.05);
  transform: translateX(5px);
}

.method-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.method-content h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.method-content p {
  color: #555;
  margin-bottom: 0.25rem;
  line-height: 1.4;
}

.method-time {
  font-size: 0.85rem;
  color: #888;
}

.social-section {
  margin-bottom: 2rem;
}

.social-section h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.brand-footer h2 {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.copyright {
  color: #888;
  font-size: 0.9rem;
}

/* Contact Form Card */
.contact-form-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.8);
}

.form-header {
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #666;
}

.modern-contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea,
.input-wrapper select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafbfc;
  transition: all 0.3s ease;
  font-family: inherit;
}

.input-wrapper input:focus,
.input-wrapper textarea:focus,
.input-wrapper select:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.input-wrapper label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #888;
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
  background: transparent;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label,
.input-wrapper textarea:focus + label,
.input-wrapper textarea:not(:placeholder-shown) + label,
.input-wrapper select:focus + label,
.input-wrapper select:not([value=""]) + label {
  top: -0.5rem;
  left: 0.75rem;
  font-size: 0.8rem;
  color: #667eea;
  background: white;
  padding: 0 0.5rem;
  font-weight: 500;
}

.input-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.input-wrapper input:focus ~ .input-border,
.input-wrapper textarea:focus ~ .input-border,
.input-wrapper select:focus ~ .input-border {
  width: 100%;
}

.form-actions {
  margin-top: 1rem;
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  min-height: 56px;
}

.submit-btn:hover:not(.loading) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn.loading {
  cursor: not-allowed;
  opacity: 0.8;
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.btn-loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Response Message */
.response-message {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.5rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  border-left: 4px solid;
}

.response-message.success {
  background: rgba(46, 204, 113, 0.1);
  border-color: #2ecc71;
}

.response-message.error {
  background: rgba(231, 76, 60, 0.1);
  border-color: #e74c3c;
}

.message-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-top: 0.25rem;
}

.message-icon svg {
  width: 100%;
  height: 100%;
}

.response-message.success .message-icon svg {
  color: #2ecc71;
}

.response-message.error .message-icon svg {
  color: #e74c3c;
}

.message-content h4 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.response-message.success .message-content h4 {
  color: #2ecc71;
}

.response-message.error .message-content h4 {
  color: #e74c3c;
}

.message-content p {
  color: #555;
  margin: 0;
}

/* FAQ Section */
.faq-section {
  background: white;
  padding: 4rem 2rem;
  margin-top: 2rem;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-header {
  text-align: center;
  margin-bottom: 3rem;
}

.faq-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.faq-header p {
  color: #666;
  font-size: 1.1rem;
}

.faq-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.faq-item {
  border: 1px solid #e1e8ed;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.faq-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.faq-item:hover {
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  cursor: pointer;
  background: #fafbfc;
  transition: background 0.3s ease;
}

.faq-question:hover {
  background: rgba(102, 126, 234, 0.05);
}

.faq-question h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
}

.faq-icon {
  flex-shrink: 0;
  color: #667eea;
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 1.5rem 1.5rem;
  background: white;
}

.faq-answer p {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* Animations */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Transitions */
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.3s ease;
}

.message-fade-enter-from,
.message-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>