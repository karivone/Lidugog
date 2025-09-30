<template>
  <div class="subscribe-page">
    <section class="subscribe-section">
      <div class="container">
        <div class="subscribe-grid">
          <!-- Content Side -->
          <div class="content-side">
            <span class="welcome-tag">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Newsletter
            </span>
            <h1>Join Our Community</h1>
            <p class="description">
              Get weekly insights, inspiration, and thoughtful conversations delivered directly to your inbox. 
              Be part of a growing community focused on meaningful connections and personal growth.
            </p>
            
            <div class="benefits">
              <div class="benefit-item">
                <div class="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div class="benefit-text">
                  <h3>Exclusive Content</h3>
                  <p>Get early access to new articles and special subscriber-only content</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </div>
                <div class="benefit-text">
                  <h3>Join Discussions</h3>
                  <p>Participate in meaningful conversations with like-minded people</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                </div>
                <div class="benefit-text">
                  <h3>Weekly Insights</h3>
                  <p>Receive curated insights and inspiration every week</p>
                </div>
              </div>

              <div class="benefit-item">
                <div class="benefit-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
                  </svg>
                </div>
                <div class="benefit-text">
                  <h3>No Spam Ever</h3>
                  <p>We respect your inbox. Unsubscribe anytime with one click</p>
                </div>
              </div>
            </div>

            <div class="stats">
              <div class="stat-item">
                <div class="stat-number">1,000+</div>
                <div class="stat-label">Subscribers</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">95%</div>
                <div class="stat-label">Open Rate</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">Weekly</div>
                <div class="stat-label">Newsletters</div>
              </div>
            </div>
          </div>

          <!-- Form Side -->
          <div class="form-side">
            <div class="form-card">
              <div class="form-header">
                <h2>Subscribe Now</h2>
                <p>Join thousands of mindful readers in our community</p>
              </div>

              <form class="subscribe-form" @submit.prevent="subscribe">
                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName">First Name *</label>
                    <div class="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input 
                        id="firstName"
                        v-model="firstName" 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter first name"
                        required 
                      />
                    </div>
                  </div>

                  <div class="form-group">
                    <label for="lastName">Last Name *</label>
                    <div class="input-wrapper">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      <input 
                        id="lastName"
                        v-model="lastName" 
                        type="text" 
                        class="form-control" 
                        placeholder="Enter last name"
                        required 
                      />
                    </div>
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email Address *</label>
                  <div class="input-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <input 
                      id="email"
                      v-model="email" 
                      type="email" 
                      class="form-control" 
                      placeholder="Enter your email"
                      required 
                    />
                  </div>
                </div>

                <div class="form-checkbox">
                  <input 
                    v-model="agree" 
                    type="checkbox" 
                    id="agree" 
                    required 
                  />
                  <label for="agree">
                    I want to receive the newsletter and accept the 
                    <a href="/privacy" target="_blank">data privacy statement</a>.
                  </label>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting" :class="{ loading: isSubmitting }">
                  <span v-if="!isSubmitting" class="btn-content">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 2L11 13"/>
                      <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                    </svg>
                    Subscribe Now
                  </span>
                  <span v-else class="btn-loading">
                    <div class="spinner"></div>
                    Subscribing...
                  </span>
                </button>
              </form>

              <!-- Success/Error Message -->
              <transition name="message-fade">
                <div v-if="message" :class="['message-alert', messageType]">
                  <div class="message-icon">
                    <svg v-if="messageType === 'success'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                    <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                  </div>
                  <div class="message-content">
                    <h4>{{ messageType === 'success' ? 'Welcome Aboard!' : 'Oops!' }}</h4>
                    <p>{{ message }}</p>
                  </div>
                </div>
              </transition>

              <div class="form-footer">
                <p>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Your information is safe and secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const agree = ref(false)
const message = ref('')
const messageType = ref('')
const isSubmitting = ref(false)

async function subscribe() {
  if (!firstName.value || !lastName.value || !email.value || !agree.value) {
    message.value = 'Please fill in all required fields and accept the terms.'
    messageType.value = 'error'
    setTimeout(() => message.value = '', 5000)
    return
  }

  isSubmitting.value = true
  message.value = ''
  messageType.value = ''

  try {
    const res = await fetch('http://localhost:4000/api/subscribe', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value
      })
    })

    if (!res.ok) {
      const data = await res.json()
      throw new Error(data.error || 'Failed to subscribe. Please try again.')
    }

    const data = await res.json()

    if (res.ok) {
      message.value = data.message || 'Success! Welcome to our community. Please check your email to confirm your subscription.'
      messageType.value = 'success'
      
      // Reset form
      firstName.value = ''
      lastName.value = ''
      email.value = ''
      agree.value = false
    } else {
      message.value = data.error || 'Subscription failed. Please try again.'
      messageType.value = 'error'
    }
  } catch (e) {
    console.error('Subscription error:', e)
    message.value = 'Network error. Please check your connection and try again.'
    messageType.value = 'error'
  } finally {
    isSubmitting.value = false
    
    // Clear message after 10 seconds
    setTimeout(() => {
      message.value = ''
      messageType.value = ''
    }, 10000)
  }
}
</script>

<style scoped>
/* Page Layout */
.subscribe-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  padding: 2rem 0;
}

.subscribe-section {
  width: 100%;
  position: relative;
}

.subscribe-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 150%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 80% -50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: center;
}

/* Content Side */
.content-side {
  color: white;
}

.welcome-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.content-side h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.description {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.benefit-item:hover {
  transform: translateX(5px);
  background: rgba(255,255,255,0.15);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.benefit-text h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.benefit-text p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin: 0;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.stat-item {
  text-align: center;
  padding: 1.5rem 1rem;
  background: rgba(255,255,255,0.1);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.stat-number {
  font-size: 2rem;
  font-weight: 800;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  opacity: 0.9;
}

/* Form Side */
.form-card {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0,0,0,0.2);
  animation: slideUp 0.6s ease;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.form-header p {
  color: #666;
}

.subscribe-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 0.9rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper svg {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
}

.form-control {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 2.75rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafbfc;
  transition: all 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.form-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid #e1e8ed;
  border-radius: 6px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.form-checkbox label {
  font-size: 0.875rem;
  color: #555;
  cursor: pointer;
  line-height: 1.5;
}

.form-checkbox label a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.form-checkbox label a:hover {
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
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

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
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
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

/* Message Alert */
.message-alert {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  border-left: 4px solid;
}

.message-alert.success {
  background: rgba(16, 185, 129, 0.1);
  border-color: #10b981;
}

.message-alert.error {
  background: rgba(239, 68, 68, 0.1);
  border-color: #ef4444;
}

.message-icon {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
}

.message-alert.success .message-icon {
  color: #10b981;
}

.message-alert.error .message-icon {
  color: #ef4444;
}

.message-content h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.message-alert.success .message-content h4 {
  color: #10b981;
}

.message-alert.error .message-content h4 {
  color: #ef4444;
}

.message-content p {
  color: #555;
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.form-footer {
  text-align: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e1e8ed;
}

.form-footer p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: #888;
  font-size: 0.85rem;
  margin: 0;
}

/* Animations */
@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
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

/* Responsive Design */
@media (max-width: 1024px) {
  .subscribe-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
    gap: 2.5rem;
  }

  .content-side {
    text-align: center;
  }

  .benefit-item {
    max-width: 500px;
    margin: 0 auto;
  }

  .stats {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .content-side h1 {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.1rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-card {
    padding: 2rem;
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 480px) {
  .subscribe-page {
    padding: 1rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .form-card {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .form-header h2 {
    font-size: 1.75rem;
  }

  .content-side h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .welcome-tag {
    font-size: 0.75rem;
    padding: 0.4rem 0.875rem;
  }

  .benefit-text h3 {
    font-size: 1rem;
  }

  .benefit-text p {
    font-size: 0.85rem;
  }
}
</style>