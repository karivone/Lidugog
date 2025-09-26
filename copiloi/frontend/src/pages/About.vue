<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-image-container">
            <img src="../assets/Picture.jpeg" alt="Kayewi" class="hero-image" />
            <div class="image-overlay"></div>
          </div>
          <div class="hero-text">
            <span class="welcome-tag">Welcome to My Blog</span>
            <h1>Hi, I'm Kayewi</h1>
            <p class="hero-description">
              Exploring life's journey through meaningful conversations and authentic stories.
              Join me in discovering insights about faith, personal growth, and human connection.
            </p>
            <div class="social-links">
              <a href="https://twitter.com" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener" class="social-link">
                <i class="fab fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="section-header">
          <h2>My Story</h2>
          <div class="divider"></div>
        </div>
        <div class="story-content">
          <p>
            I believe in the power of authentic storytelling and meaningful connections. Through this platform, I share my thoughts, experiences, and insights about life, faith, and personal growth. My goal is to create a space where we can explore life's deeper questions together and find inspiration in our shared human experience.
          </p>
          <p>
            Join me on this journey as we explore topics that matter - from faith and spirituality to personal development and mental wellness. Together, we'll discover new perspectives, share stories, and build a community focused on growth and authentic connection.
          </p>
          <p>
            This blog is more than just words on a screen; it's a gathering place for those seeking deeper meaning, understanding, and connection in their lives. Whether you're here to find inspiration, share your story, or simply explore, I'm glad you're here.
          </p>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="resources-section">
      <div class="container">
        <div class="section-header">
          <h2>Helpful Resources</h2>
          <p class="section-description">Curated resources for your mental health and personal growth journey</p>
          <div class="divider"></div>
        </div>

        <div class="resources-grid">
          <!-- Websites -->
          <div class="resource-card">
            <div class="card-icon">
              <i class="fas fa-globe"></i>
            </div>
            <h3>Websites</h3>
            <ul class="resource-list">
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Mental Health America</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Psychology Today</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Mindfulness Resources</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
            </ul>
          </div>

          <!-- Organizations -->
          <div class="resource-card">
            <div class="card-icon">
              <i class="fas fa-hands-helping"></i>
            </div>
            <h3>Organizations</h3>
            <ul class="resource-list">
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">National Alliance on Mental Health</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Crisis Text Line</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Support Groups</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
            </ul>
          </div>

          <!-- Books -->
          <div class="resource-card">
            <div class="card-icon">
              <i class="fas fa-book-reader"></i>
            </div>
            <h3>Books</h3>
            <ul class="resource-list">
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">The Road Less Traveled</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">Man's Search for Meaning</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
              <li>
                <a href="https://example.com" target="_blank" rel="noopener">
                  <span class="resource-title">The Power of Now</span>
                  <i class="fas fa-external-link-alt"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// Component is purely presentational, no script needed
</script>


<style scoped>
.about-page {
  background: var(--bg-primary);
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  padding: var(--space-3xl) 0;
  color: var(--text-light);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 150%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 80% -50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: auto 1.5fr;
  gap: var(--space-2xl);
  align-items: center;
}

.hero-image-container {
  position: relative;
  width: 320px;
  height: 480px;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-xl);
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.hero-image-container:hover .hero-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
}

.hero-text {
  padding-right: var(--space-2xl);
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

.hero-text h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: var(--space-xl);
  opacity: 0.9;
}

.social-links {
  display: flex;
  gap: var(--space-md);
}

.social-link {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  color: var(--text-light);
  transition: all var(--transition-normal);
  backdrop-filter: blur(8px);
}

.social-link:hover {
  transform: translateY(-2px);
  background: rgba(255,255,255,0.2);
}
/* Story Section */
.story-section {
  padding: var(--space-3xl) 0;
  background: var(--bg-secondary);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.section-header h2 {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: var(--space-md);
}

.divider {
  width: 60px;
  height: 4px;
  background: var(--gradient-primary);
  margin: 0 auto;
  border-radius: var(--radius-full);
}

.section-description {
  font-size: 1.125rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: var(--space-lg) auto;
}

.story-content {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.125rem;
  line-height: 1.8;
  color: var(--text-secondary);
}

.story-content p {
  margin-bottom: var(--space-xl);
}

/* Resources Section */
.resources-section {
  padding: var(--space-3xl) 0;
  background: var(--bg-primary);
}

.resources-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-xl);
  margin-top: var(--space-2xl);
}

.resource-card {
  background: var(--bg-secondary);
  border-radius: var(--radius-xl);
  padding: var(--space-2xl);
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
}

.resource-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-xl);
}

.card-icon {
  width: 64px;
  height: 64px;
  background: var(--gradient-primary);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: var(--space-xl);
}

.resource-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: var(--space-xl);
  color: var(--text-primary);
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.resource-list li a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-md) var(--space-lg);
  background: var(--bg-primary);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--transition-normal);
}

.resource-list li a:hover {
  transform: translateX(4px);
  background: var(--bg-tertiary);
}

.resource-title {
  font-weight: 500;
}

.resource-list li a i {
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: transform var(--transition-normal);
}

.resource-list li a:hover i {
  transform: translateX(2px);
  color: var(--primary-color);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: var(--space-xl);
  }

  .hero-image-container {
    width: 280px;
    height: 420px;
    margin: 0 auto;
  }

  .hero-text {
    padding-right: 0;
  }

  .social-links {
    justify-content: center;
  }

  .story-content {
    padding: 0 var(--space-lg);
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-2xl) 0;
  }

  .hero-image-container {
    width: 240px;
    height: 360px;
  }

  .hero-text h1 {
    font-size: clamp(2rem, 4vw, 3rem);
  }

  .hero-description {
    font-size: 1.125rem;
  }

  .story-content {
    font-size: 1rem;
  }

  .resources-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .hero-image-container {
    width: 200px;
    height: 300px;
  }

  .welcome-tag {
    font-size: 0.75rem;
  }

  .resource-card {
    padding: var(--space-lg);
  }

  .card-icon {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
  }
}
</style>
