<template>
  <div>
    <!-- Hero Section with Parallax Effect -->
    <section class="hero">
      <div class="hero-gradient-overlay"></div>
      <img src="../assets/lidugog_banner_e.png" alt="Blog Hero" class="hero-img" />
      <div class="hero-content">
        <h1 class="hero-title">Welcome to Lidugog Blog</h1>
        <p class="tagline">Life, Faith, and Fun—All in One Place</p>
        <router-link to="/subscribe" class="cta-btn">
          <span>Join the Conversation</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>
      </div>
      <div class="scroll-indicator">
        <div class="scroll-dot"></div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-container">
        <div class="stat-item">
          <div class="stat-number" data-count="1000">0</div>
          <div class="stat-label">Readers</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-count="50">0</div>
          <div class="stat-label">Articles</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-count="25">0</div>
          <div class="stat-label">Countries</div>
        </div>
      </div>
    </section>

    <!-- Recent Posts with Glass Effect -->
    <section class="recent-posts-preview">
      <div class="section-header">
        <h2>Recent Posts</h2>
        <p class="section-subtitle">Discover our latest thoughts and insights</p>
      </div>
      <BlogList :posts="recentPosts" :showReadMore="false" :showFullPost="true" :fullPostRoute="post => `/blog/${post.id}`" />
      <router-link to="/blog" class="see-all">
        <span>See all posts</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </router-link>
    </section>

    <!-- Newsletter CTA -->
    <section class="newsletter-cta">
      <div class="newsletter-content">
        <h2>Stay Updated</h2>
        <p>Get the latest posts delivered right to your inbox</p>
        <router-link to="/subscribe" class="newsletter-btn">Subscribe Now</router-link>
      </div>
    </section>

    <!-- Contact Section with Dark Theme -->
    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-info">
          <div class="brand-section">
            <h2>Inner Pieces</h2>
            <p class="brand-tagline">Connecting hearts and minds</p>
          </div>
          <div class="contact-details">
            <div class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span>123-456-7890</span>
            </div>
            <div class="contact-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <span>info@mysite.com</span>
            </div>
          </div>
          <div class="social-links">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.11 0c-2.5 0-4.51 2.01-4.51 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 0 1 0 20.29a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/>
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/>
              </svg>
            </a>
          </div>
          <p class="copyright">© 2035 by Inner Pieces.</p>
        </div>
        <div class="contact-form-wrap">
          <div class="form-header">
            <h1>Let's Connect</h1>
            <p class="subtitle">Have something on your mind? We'd love to hear from you.</p>
          </div>
          <form class="contact-form" @submit.prevent="sendContact">
            <div class="form-group">
              <div class="input-row">
                <div class="input-wrapper">
                  <input v-model="firstName" type="text" placeholder=" " required id="firstName" />
                  <label for="firstName">First Name *</label>
                </div>
                <div class="input-wrapper">
                  <input v-model="lastName" type="text" placeholder=" " required id="lastName" />
                  <label for="lastName">Last Name *</label>
                </div>
              </div>
              <div class="input-wrapper">
                <input v-model="email" type="email" placeholder=" " required id="email" />
                <label for="email">Email Address *</label>
              </div>
              <div class="input-wrapper">
                <textarea v-model="messageText" placeholder=" " required rows="5" id="message"></textarea>
                <label for="message">Your Message *</label>
              </div>
            </div>
            <button type="submit" class="submit-btn">
              <span>Send Message</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 21l21-9L2 3v7l15 2-15 2z"/>
              </svg>
            </button>
          </form>
          <div v-if="responseMsg" class="success-msg" :class="{ 'show': responseMsg }">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 12l2 2 4-4"/>
              <circle cx="12" cy="12" r="10"/>
            </svg>
            {{ responseMsg }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import BlogList from '../components/BlogList.vue'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const messageText = ref('')
const responseMsg = ref('')
const recentPosts = ref([])

async function sendContact() {
  if (!firstName.value || !lastName.value || !email.value || !messageText.value) {
    responseMsg.value = 'Please fill all fields.'
    return
  }
  try {
    const res = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        name: `${firstName.value} ${lastName.value}`, 
        email: email.value, 
        message: messageText.value 
      })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Submission failed')
    responseMsg.value = data.message || 'Thank you for reaching out!'
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    messageText.value = ''
  } catch (e) {
    responseMsg.value = e.message || 'Submission failed.'
  }
}

function animateCounter(el) {
  const target = parseInt(el.dataset.count)
  let current = 0
  const increment = target / 50
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    el.textContent = Math.floor(current) + '+'
  }, 50)
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/api/posts')
    const data = await res.json()
    recentPosts.value = data.slice(0, 3).map((post, idx) => ({
      ...post,
      image: idx === 0 ? blog1 : idx === 1 ? blog2 : blog3
    }))
  } catch (e) {
    recentPosts.value = []
  }

  // Animate counters when they come into view
  await nextTick()
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-number')
        counters.forEach(counter => {
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated')
            animateCounter(counter)
          }
        })
      }
    })
  })
  
  const statsSection = document.querySelector('.stats-section')
  if (statsSection) observer.observe(statsSection)
})
</script>

<style scoped>
/* Hero Section */
.hero {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.9) 100%);
  z-index: 2;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  opacity: 0.3;
}

.hero-content {
  position: relative;
  z-index: 3;
  color: #fff;
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
  text-shadow: 0 2px 20px rgba(0,0,0,0.3);
  animation: fadeInUp 1s ease-out;
}

.tagline {
  font-size: clamp(1.1rem, 3vw, 1.5rem);
  margin-bottom: 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
  animation: fadeInUp 1s ease-out 0.3s both;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
  animation: fadeInUp 1s ease-out 0.6s both;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
}

.cta-btn svg {
  transition: transform 0.3s ease;
}

.cta-btn:hover svg {
  transform: translateX(5px);
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.scroll-dot {
  width: 6px;
  height: 30px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  position: relative;
}

.scroll-dot::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 8px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 2px;
  animation: scrollIndicator 2s infinite;
}

/* Stats Section */
.stats-section {
  background: #fff;
  padding: 4rem 2rem;
  margin-top: -50px;
  position: relative;
  z-index: 4;
}

.stats-container {
  max-width: 800px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
  padding: 2rem 1rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #fff 100%);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 0.5rem;
  display: block;
}

.stat-label {
  font-size: 1.1rem;
  color: #666;
  font-weight: 500;
}

/* Recent Posts Section */
.recent-posts-preview {
  padding: 6rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  color: #667eea;
  font-weight: 600;
  text-decoration: none;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.see-all:hover {
  color: #5a67d8;
  transform: translateX(5px);
}

.see-all svg {
  transition: transform 0.3s ease;
}

.see-all:hover svg {
  transform: translateX(5px);
}

/* Newsletter CTA */
.newsletter-cta {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
  margin: 4rem 0;
}

.newsletter-content h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.newsletter-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.newsletter-btn {
  display: inline-block;
  background: #fff;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.newsletter-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.3);
}

/* Contact Section */
.contact-section {
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 6rem 2rem;
  margin: 0;
}

.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  align-items: start;
}

.contact-info {
  color: #fff;
}

.brand-section h2 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-tagline {
  font-size: 1rem;
  opacity: 0.8;
  margin-bottom: 2rem;
}

.contact-details {
  margin-bottom: 2rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 1rem;
}

.contact-item svg {
  color: #ffd700;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.social-icon:hover {
  background: rgba(255, 215, 0, 0.2);
  transform: translateY(-3px);
}

.copyright {
  opacity: 0.7;
  font-size: 0.9rem;
  margin-top: 2rem;
}

.contact-form-wrap {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
  font-size: 1rem;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.input-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.input-wrapper {
  position: relative;
}

.input-wrapper input,
.input-wrapper textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.input-wrapper input:focus,
.input-wrapper textarea:focus {
  outline: none;
  border-color: #ffd700;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
}

.input-wrapper label {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1rem;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-wrapper input:focus + label,
.input-wrapper input:not(:placeholder-shown) + label,
.input-wrapper textarea:focus + label,
.input-wrapper textarea:not(:placeholder-shown) + label {
  top: -0.5rem;
  left: 0.75rem;
  font-size: 0.8rem;
  color: #ffd700;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  padding: 0 0.5rem;
  border-radius: 4px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, #ffd700 0%, #ffb347 100%);
  color: #1e3c72;
  border: none;
  border-radius: 12px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover svg {
  transform: translateX(5px);
}

.success-msg {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  padding: 1rem;
  border-radius: 12px;
  border: 1px solid rgba(46, 204, 113, 0.3);
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.success-msg.show {
  opacity: 1;
  transform: translateY(0);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scrollIndicator {
  0% { transform: translateX(-50%) translateY(0); opacity: 1; }
  50% { transform: translateX(-50%) translateY(10px); opacity: 0.5; }
  100% { transform: translateX(-50%) translateY(20px); opacity: 0; }
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .input-row {
    grid-template-columns: 1fr;
  }
  
  .hero {
    height: 70vh;
    min-height: 500px;
  }
  
  .stats-container {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>