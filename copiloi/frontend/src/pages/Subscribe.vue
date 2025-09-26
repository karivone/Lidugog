<template>
  <div class="subscribe-page">
    <section class="subscribe-section">
      <div class="container">
        <div class="subscribe-grid">
          <!-- Content Side -->
          <div class="content-side">
            <span class="welcome-tag">Newsletter</span>
            <h1>Join Our Community</h1>
            <p class="description">
              Get weekly insights, inspiration, and thoughtful conversations delivered directly to your inbox. 
              Be part of a growing community focused on meaningful connections and personal growth.
            </p>
            
            <div class="benefits">
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="fas fa-book-reader"></i>
                </div>
                <div class="benefit-text">
                  <h3>Exclusive Content</h3>
                  <p>Get early access to new articles and special content</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="fas fa-comments"></i>
                </div>
                <div class="benefit-text">
                  <h3>Join Discussions</h3>
                  <p>Participate in meaningful conversations with like-minded people</p>
                </div>
              </div>
              
              <div class="benefit-item">
                <div class="benefit-icon">
                  <i class="fas fa-lightbulb"></i>
                </div>
                <div class="benefit-text">
                  <h3>Weekly Insights</h3>
                  <p>Receive curated insights and inspiration every week</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Side -->
          <div class="form-side">
            <div class="form-card">
              <div class="form-header">
                <h2>Subscribe Now</h2>
                <p>Join our growing community of mindful readers</p>
              </div>

              <form class="subscribe-form" @submit.prevent="subscribe">
                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName">First Name</label>
                    <input 
                      id="firstName"
                      v-model="firstName" 
                      type="text" 
                      class="form-control" 
                      placeholder="Enter your first name"
                      required 
                    />
                  </div>

                  <div class="form-group">
                    <label for="lastName">Last Name</label>
                    <input 
                      id="lastName"
                      v-model="lastName" 
                      type="text" 
                      class="form-control" 
                      placeholder="Enter your last name"
                      required 
                    />
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email Address</label>
                  <input 
                    id="email"
                    v-model="email" 
                    type="email" 
                    class="form-control" 
                    placeholder="Enter your email address"
                    required 
                  />
                </div>

                <div class="form-checkbox">
                  <input 
                    v-model="agree" 
                    type="checkbox" 
                    id="agree" 
                    required 
                  />
                  <label for="agree">
                    Yes, I want to receive your newsletter and accept the data privacy statement.
                  </label>
                </div>

                <button type="submit" class="submit-btn" :disabled="isSubmitting">
                  <span>{{ isSubmitting ? 'Subscribing...' : 'Subscribe Now' }}</span>
                  <i class="fas fa-paper-plane"></i>
                </button>
              </form>

              <div v-if="message" :class="['alert', messageStatus]">
                <i :class="messageIcon"></i>
                <span>{{ message }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const formData = reactive({
  firstName: '',
  lastName: '',
  email: '',
  interests: [],
  consent: false
})

const message = ref('')
const messageType = ref('')
const isLoading = ref(false)

const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return regex.test(email)
}

const resetForm = () => {
  formData.firstName = ''
  formData.lastName = ''
  formData.email = ''
  formData.interests = []
  formData.consent = false
}

const showMessage = (msg, type = 'error', duration = 5000) => {
  message.value = msg
  messageType.value = type
  if (duration) {
    setTimeout(() => {
      message.value = ''
      messageType.value = ''
    }, duration)
  }
}

const handleSubmit = async () => {
  if (!formData.consent) {
    showMessage('Please accept the terms and conditions to continue.')
    return
  }

  if (!validateEmail(formData.email)) {
    showMessage('Please enter a valid email address.')
    return
  }

  isLoading.value = true
  message.value = ''
  messageType.value = ''

  try {
    // Mock API call - replace with your actual API endpoint
    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        subscriptionDate: new Date().toISOString(),
        source: window.location.hostname
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || 'Subscription failed')
    }

    // Handle success
    showMessage(
      'Success! Welcome to our community. Please check your email to confirm your subscription.',
      'success'
    )
    
    // Reset form on success
    resetForm()
    
  } catch (error) {
    console.error('Subscription error:', error)
    showMessage(
      error.message || 'Something went wrong. Please try again later.'
    )
  } finally {
    isLoading.value = false
  }
}

// Track form completion
const formProgress = ref(0)

const updateFormProgress = () => {
  let completed = 0
  if (formData.firstName) completed++
  if (formData.lastName) completed++
  if (validateEmail(formData.email)) completed++
  if (formData.interests.length > 0) completed++
  if (formData.consent) completed++
  
  formProgress.value = (completed / 5) * 100
}

// Watch for form changes to update progress
watch(
  () => ({ ...formData }),
  () => updateFormProgress(),
  { deep: true }
)
</script>
<style scoped>
.subscribe-page {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  display: flex;
  align-items: center;
}

.subscribe-section {
  width: 100%;
  padding: var(--space-3xl) 0;
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
  position: relative;
  z-index: 1;
}

.subscribe-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: var(--space-3xl);
  align-items: center;
}

/* Content Side */
.content-side {
  color: var(--text-light);
}

.welcome-tag {
  display: inline-block;
  padding: var(--space-sm) var(--space-lg);
  background: rgba(255,255,255,0.1);
  border-radius: var(--radius-full);
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: var(--space-lg);
  backdrop-filter: blur(8px);
}

.content-side h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: var(--space-2xl);
  opacity: 0.9;
}

.benefits {
  display: flex;
  flex-direction: column;
  gap: var(--space-lg);
  margin-top: var(--space-2xl);
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  padding: var(--space-lg);
  background: rgba(255,255,255,0.1);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(8px);
  transition: all var(--transition-normal);
}

.benefit-item:hover {
  transform: translateX(4px);
  background: rgba(255,255,255,0.15);
}

.benefit-icon {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.benefit-text h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.benefit-text p {
  font-size: 0.875rem;
  opacity: 0.9;
  margin: 0;
}

/* Form Side */
.form-card {
  background: var(--bg-primary);
  border-radius: var(--radius-2xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-xl);
  animation: slideIn 0.6s ease;
}

.form-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.form-header h2 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-sm);
}

.form-header p {
  color: var(--text-secondary);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-lg);
  margin-bottom: var(--space-lg);
}

.form-group {
  margin-bottom: var(--space-lg);
}

.form-group label {
  display: block;
  font-weight: 500;
  margin-bottom: var(--space-xs);
  color: var(--text-primary);
}

.form-control {
  width: 100%;
  padding: var(--space-md) var(--space-lg);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-lg);
  font-size: 1rem;
  transition: all var(--transition-normal);
  background: var(--bg-secondary);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--bg-primary);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.form-checkbox {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
}

.form-checkbox input[type="checkbox"] {
  width: 20px;
  height: 20px;
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  cursor: pointer;
}

.form-checkbox label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: var(--space-lg);
  border: none;
  border-radius: var(--radius-lg);
  background: var(--gradient-primary);
  color: var(--text-light);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.submit-btn i {
  transition: transform var(--transition-normal);
}

.submit-btn:not(:disabled):hover i {
  transform: translateX(4px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-md);
  animation: slideIn 0.3s ease;
}

.alert-success {
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid rgba(16, 185, 129, 0.2);
  color: var(--secondary-color);
}

.alert-error {
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1200px) {
  .subscribe-grid {
    grid-template-columns: 1fr;
    max-width: 600px;
    margin: 0 auto;
    gap: var(--space-2xl);
  }

  .content-side {
    text-align: center;
  }

  .benefit-item {
    max-width: 500px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .subscribe-section {
    padding: var(--space-xl) 0;
  }

  .content-side h1 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .description {
    font-size: 1.125rem;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .form-card {
    padding: var(--space-xl);
  }

  .benefit-item {
    flex-direction: column;
    text-align: center;
    padding: var(--space-md);
  }

  .benefit-icon {
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .form-card {
    padding: var(--space-lg);
  }

  .form-header h2 {
    font-size: 1.75rem;
  }

  .welcome-tag {
    font-size: 0.75rem;
  }
}
.subscribe-form input[type="text"],
.subscribe-form input[type="email"] {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
}
.subscribe-form button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
.subscribe-form button:hover {
  background: #369e6f;
}
.success-msg {
  color: #42b983;
  margin-top: 1rem;
  text-align: center;
}
</style>
