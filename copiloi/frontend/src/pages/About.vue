<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content">
        <div class="hero-image-container">
          <div class="image-frame">
            <img src="../assets/Picture.jpeg" alt="Kayewi" class="hero-image" />
            <div class="image-decoration"></div>
          </div>
        </div>
        <div class="hero-text">
          <h1 class="hero-title">Hi, I'm Kayewi</h1>
          <p class="hero-subtitle">Writer • Thinker • Storyteller</p>
          <div class="hero-description">
            <p>Welcome to my corner of the internet where I share thoughts on life, faith, and the beautiful journey we're all on together.</p>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number">50+</div>
              <div class="stat-label">Articles</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">1K+</div>
              <div class="stat-label">Readers</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">3</div>
              <div class="stat-label">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="story-container">
        <div class="story-header">
          <h2>My Story</h2>
          <p>Every journey has a beginning, and this is mine</p>
        </div>
        
        <div class="story-content">
          <div class="story-timeline">
            <div class="timeline-item" v-for="(item, index) in timeline" :key="index">
              <div class="timeline-marker">
                <div class="timeline-icon">
                  <component :is="getTimelineIcon(item.type)" />
                </div>
              </div>
              <div class="timeline-content">
                <div class="timeline-year">{{ item.year }}</div>
                <h3 class="timeline-title">{{ item.title }}</h3>
                <p class="timeline-description">{{ item.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy Section -->
    <section class="philosophy-section">
      <div class="philosophy-container">
        <div class="philosophy-content">
          <h2>What I Believe</h2>
          <div class="beliefs-grid">
            <div class="belief-card" v-for="(belief, index) in beliefs" :key="index">
              <div class="belief-icon">
                <component :is="getBeliefIcon(belief.type)" />
              </div>
              <h3>{{ belief.title }}</h3>
              <p>{{ belief.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills & Interests -->
    <section class="skills-section">
      <div class="skills-container">
        <div class="skills-header">
          <h2>What I'm Passionate About</h2>
          <p>The topics and skills that drive my writing and thinking</p>
        </div>
        
        <div class="skills-grid">
          <div class="skill-category" v-for="(category, index) in skillCategories" :key="index">
            <div class="category-header">
              <div class="category-icon">
                <component :is="getCategoryIcon(category.type)" />
              </div>
              <h3>{{ category.name }}</h3>
            </div>
            <div class="skill-tags">
              <span class="skill-tag" v-for="skill in category.skills" :key="skill">
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="resources-section">
      <div class="resources-container">
        <div class="resources-header">
          <h2>Resources & Information</h2>
          <p class="resources-subtitle">Helpful links and resources for mental health and personal growth</p>
        </div>
        
        <div class="resources-content">
          <div class="resources-intro">
            <div class="intro-card">
              <div class="intro-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M9 12l2 2 4-4"/>
                  <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                  <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                  <path d="M3 12c0 6 0 6 18 0"/>
                </svg>
              </div>
              <h3>When Asking a Friend Is Just Not Enough</h3>
              <p>Sometimes we need professional support and resources. Here are some trusted places to find help and information for mental health and personal development.</p>
            </div>
          </div>

          <div class="resources-grid">
            <div class="resource-category">
              <div class="category-header">
                <div class="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <h3>Websites</h3>
              </div>
              <div class="resource-list">
                <a href="https://www.nami.org" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>National Alliance on Mental Illness</h4>
                    <p>Comprehensive mental health resources and support</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="https://www.mentalhealth.gov" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>MentalHealth.gov</h4>
                    <p>Government resource for mental health information</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="https://www.psychology.org" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>Psychology.org</h4>
                    <p>Educational resources and professional directories</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div class="resource-category">
              <div class="category-header">
                <div class="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                </div>
                <h3>Organizations</h3>
              </div>
              <div class="resource-list">
                <a href="https://www.samhsa.gov" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>SAMHSA</h4>
                    <p>Substance Abuse and Mental Health Services Administration</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="https://www.mhanational.org" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>Mental Health America</h4>
                    <p>Leading community-based mental health organization</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="https://www.apa.org" target="_blank" rel="noopener" class="resource-link">
                  <div class="link-content">
                    <h4>American Psychological Association</h4>
                    <p>Professional psychology organization and resources</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            <div class="resource-category">
              <div class="category-header">
                <div class="category-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <h3>Books</h3>
              </div>
              <div class="resource-list">
                <a href="#" class="resource-link">
                  <div class="link-content">
                    <h4>"The Body Keeps the Score"</h4>
                    <p>by Bessel van der Kolk - Understanding trauma and healing</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="#" class="resource-link">
                  <div class="link-content">
                    <h4>"Mindset"</h4>
                    <p>by Carol S. Dweck - The power of believing you can improve</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
                <a href="#" class="resource-link">
                  <div class="link-content">
                    <h4>"The Gifts of Imperfection"</h4>
                    <p>by Brené Brown - Courage, compassion, and connection</p>
                  </div>
                  <div class="link-arrow">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section">
      <div class="cta-container">
        <div class="cta-content">
          <h2>Let's Connect</h2>
          <p>I'd love to hear from you! Whether you have questions, want to share your thoughts, or just want to say hello.</p>
          <div class="cta-buttons">
            <router-link to="/contact" class="cta-btn primary">Get in Touch</router-link>
            <router-link to="/subscribe" class="cta-btn secondary">Subscribe to Updates</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Timeline data
const timeline = ref([
  {
    year: '2021',
    title: 'Started Writing',
    description: 'Began sharing thoughts and experiences through writing, finding a voice in the digital space.',
    type: 'start'
  },
  {
    year: '2022',
    title: 'First Blog Launch',
    description: 'Launched my first blog focused on personal growth and spiritual journey.',
    type: 'milestone'
  },
  {
    year: '2023',
    title: 'Community Building',
    description: 'Started building a community of like-minded individuals seeking growth and meaning.',
    type: 'growth'
  },
  {
    year: '2024',
    title: 'Expanding Horizons',
    description: 'Exploring new topics and connecting with readers from around the world.',
    type: 'expansion'
  }
])

// Beliefs data
const beliefs = ref([
  {
    title: 'Authentic Growth',
    description: 'Real growth comes from honest self-reflection and the courage to be vulnerable.',
    type: 'growth'
  },
  {
    title: 'Community Connection',
    description: 'We\'re not meant to journey alone. Connection and community are essential.',
    type: 'community'
  },
  {
    title: 'Faith & Purpose',
    description: 'Faith provides direction and purpose, guiding us through life\'s challenges.',
    type: 'faith'
  },
  {
    title: 'Lifelong Learning',
    description: 'Every experience teaches us something. Stay curious and open to learning.',
    type: 'learning'
  }
])

// Skills and interests
const skillCategories = ref([
  {
    name: 'Writing & Communication',
    type: 'writing',
    skills: ['Blog Writing', 'Storytelling', 'Content Strategy', 'Social Media']
  },
  {
    name: 'Personal Development',
    type: 'development',
    skills: ['Mindfulness', 'Self-Reflection', 'Goal Setting', 'Habit Formation']
  },
  {
    name: 'Faith & Spirituality',
    type: 'faith',
    skills: ['Biblical Studies', 'Prayer', 'Community Building', 'Mentoring']
  }
])

// Icon components functions
function getTimelineIcon(type) {
  const icons = {
    start: 'svg',
    milestone: 'svg',
    growth: 'svg',
    expansion: 'svg'
  }
  return icons[type] || 'svg'
}

function getBeliefIcon(type) {
  return 'svg'
}

function getCategoryIcon(type) {
  return 'svg'
}

onMounted(() => {
  // Add entrance animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
      }
    })
  }, { threshold: 0.1 })

  // Observe elements for animation
  document.querySelectorAll('.timeline-item, .belief-card, .skill-category, .resource-category').forEach(el => {
    observer.observe(el)
  })
})
</script>

<style scoped>
/* Page Layout */
.about-page {
  min-height: 100vh;
  background: #fafbfc;
}

/* Hero Section */
.about-hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
}

.hero-pattern {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0);
  background-size: 40px 40px;
}

.hero-content {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  align-items: center;
}

.hero-image-container {
  position: relative;
}

.image-frame {
  position: relative;
  width: 300px;
  height: 400px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-decoration {
  position: absolute;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 32px;
  pointer-events: none;
}

.hero-text {
  max-width: 600px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: 1.3rem;
  opacity: 0.9;
  margin-bottom: 2rem;
  font-weight: 300;
}

.hero-description {
  margin-bottom: 2.5rem;
}

.hero-description p {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Story Section */
.story-section {
  padding: 6rem 2rem;
  background: white;
}

.story-container {
  max-width: 1000px;
  margin: 0 auto;
}

.story-header {
  text-align: center;
  margin-bottom: 4rem;
}

.story-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.story-header p {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.story-timeline {
  position: relative;
  padding-left: 2rem;
}

.story-timeline::before {
  content: '';
  position: absolute;
  left: 30px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, #667eea, #764ba2);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.6s ease;
}

.timeline-item.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.timeline-marker {
  position: absolute;
  left: -45px;
  top: 0;
}

.timeline-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
}

.timeline-content {
  background: #fafbfc;
  padding: 2rem;
  border-radius: 16px;
  border-left: 4px solid #667eea;
  margin-left: 1rem;
}

.timeline-year {
  font-size: 0.9rem;
  color: #667eea;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.timeline-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.timeline-description {
  color: #555;
  line-height: 1.6;
}

/* Philosophy Section */
.philosophy-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.philosophy-container {
  max-width: 1200px;
  margin: 0 auto;
}

.philosophy-content h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 3rem;
}

.beliefs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.belief-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.8);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.belief-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.belief-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.belief-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: white;
}

.belief-card h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.belief-card p {
  color: #555;
  line-height: 1.6;
}

/* Skills Section */
.skills-section {
  padding: 6rem 2rem;
  background: white;
}

.skills-container {
  max-width: 1000px;
  margin: 0 auto;
}

.skills-header {
  text-align: center;
  margin-bottom: 3rem;
}

.skills-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.skills-header p {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.skills-grid {
  display: grid;
  gap: 2rem;
}

.skill-category {
  background: #fafbfc;
  padding: 2rem;
  border-radius: 16px;
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(-20px);
}

.skill-category.animate-in {
  opacity: 1;
  transform: translateX(0);
}

.skill-category:hover {
  background: white;
  border-color: #667eea;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.1);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.category-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.category-header h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.skill-tag {
  background: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #555;
  border: 1px solid #e1e8ed;
  transition: all 0.2s ease;
}

.skill-tag:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

/* Resources Section */
.resources-section {
  padding: 6rem 2rem;
  background: #fafbfc;
}

.resources-container {
  max-width: 1200px;
  margin: 0 auto;
}

.resources-header {
  text-align: center;
  margin-bottom: 3rem;
}

.resources-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.resources-subtitle {
  font-size: 1.2rem;
  color: #666;
  font-weight: 300;
}

.resources-intro {
  margin-bottom: 3rem;
}

.intro-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2.5rem;
  border-radius: 20px;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
}

.intro-icon {
  width: 60px;
  height: 60px;
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.intro-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.intro-card p {
  font-size: 1.1rem;
  line-height: 1.6;
  opacity: 0.95;
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.resource-category {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.resource-category.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.resource-category:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.resource-category .category-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.resource-category .category-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.resource-category h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
}

.resource-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.resource-link {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  text-decoration: none;
  background: #fafbfc;
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
}

.resource-link:hover {
  background: #f0f4ff;
  border-color: #667eea;
  transform: translateX(5px);
}

.link-content {
  flex: 1;
}

.link-content h4 {
  font-size: 1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.link-content p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
}

.link-arrow {
  width: 28px;
  height: 28px;
  background: rgba(102, 126, 234, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667eea;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.resource-link:hover .link-arrow {
  background: #667eea;
  color: white;
  transform: rotate(45deg);
}

/* CTA Section */
.cta-section {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.cta-content h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
  line-height: 1.6;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  min-width: 200px;
}

.cta-btn.primary {
  background: white;
  color: #667eea;
  box-shadow: 0 8px 25px rgba(0,0,0,0.2);
}

.cta-btn.primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 35px rgba(0,0,0,0.3);
}

.cta-btn.secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid white;
  backdrop-filter: blur(10px);
}

.cta-btn.secondary:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-3px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-image-container {
    margin: 0 auto;
  }
  
  .hero-text {
    max-width: 100%;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .resources-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .image-frame {
    width: 250px;
    height: 350px;
  }
  
  .story-timeline {
    padding-left: 0;
  }
  
  .story-timeline::before {
    left: 10px;
  }
  
  .timeline-marker {
    left: -25px;
  }
  
  .timeline-icon {
    width: 48px;
    height: 48px;
  }
  
  .timeline-content {
    margin-left: 2rem;
  }
  
  .beliefs-grid {
    grid-template-columns: 1fr;
  }
  
  .skills-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 300px;
  }
}

@media (max-width: 480px) {
  .image-frame {
    width: 200px;
    height: 300px;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .timeline-content {
    padding: 1.5rem;
  }
  
  .belief-card {
    padding: 2rem 1.5rem;
  }
  
  .skill-category {
    padding: 1.5rem;
  }
  
  .resource-category {
    padding: 1.5rem;
  }
  
  .intro-card {
    padding: 2rem;
  }
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

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* SVG Icon placeholders - These would be your actual icon components */
svg {
  width: 24px;
  height: 24px;
}

.timeline-icon svg,
.belief-icon svg,
.category-icon svg {
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>