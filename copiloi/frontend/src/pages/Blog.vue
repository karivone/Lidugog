<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="main-title">Stories & Insights</h1>
          <div class="title-divider"></div>
          <p class="hero-description">
            Explore our collection of thoughtful insights, personal experiences, and stories 
            about faith, growth, and meaningful connections.
          </p>
          
          <!-- Search Box -->
          <div class="search-container">
            <div class="search-box">
              <i class="fas fa-search search-icon"></i>
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search articles..."
                class="search-input"
              >
            </div>
          </div>
        </div>
      </div>
      <div class="hero-background"></div>
    </section>

    <!-- Blog Posts Section -->
    <section class="blog-posts-section">
      <div class="container">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-spinner"></div>
          <p>Discovering stories for you...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h3>{{ error }}</h3>
          <p>We're having trouble loading the posts</p>
          <button @click="loadPosts" class="retry-btn">
            <span>Try Again</span>
            <i class="fas fa-redo"></i>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!allPosts.length" class="empty-state">
          <div class="empty-icon">
            <i class="fas fa-feather-alt"></i>
          </div>
          <h3>Stories Coming Soon</h3>
          <p>We're crafting meaningful content for you. Check back soon!</p>
        </div>

        <!-- Posts Grid -->
        <div v-else class="posts-container">
          <div class="section-header" v-if="filteredPosts.length">
            <h2 v-if="searchQuery">Search Results</h2>
            <h2 v-else>Latest Stories</h2>
            <div class="divider"></div>
          </div>
          
          <div class="posts-grid">
            <BlogList 
              :posts="filteredPosts" 
              :showReadMore="false" 
              :showFullPost="true" 
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import BlogList from '../components/BlogList.vue'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

const allPosts = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')

// Computed property for filtered posts
const filteredPosts = computed(() => {
  if (!searchQuery.value) return allPosts.value
  
  const query = searchQuery.value.toLowerCase()
  return allPosts.value.filter(post => 
    post.title?.toLowerCase().includes(query) ||
    post.content?.toLowerCase().includes(query) ||
    post.author?.toLowerCase().includes(query)
  )
})

// Function to load posts
async function loadPosts() {
  isLoading.value = true
  error.value = null
  
  try {
    // Try to connect to the backend
    let data;
    try {
      const res = await fetch('http://localhost:4000/api/posts', {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error('Blog posts endpoint not found. Please check the server configuration.');
        }
        throw new Error(`Server error: ${res.statusText || 'Unknown error'}`);
      }

      data = await res.json();
    } catch (err) {
      console.error('Network error:', err);
      throw new Error('Could not connect to server. Please make sure the backend is running.');
    }

    if (!Array.isArray(data)) {
      console.error('Invalid data format:', data);
      throw new Error('Invalid response from server');
    }

    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received from server')
    }

    if (data.length === 0) {
      console.log('No posts found in database')
      // Use fallback data for development
      data = [
        {
          id: 1,
          title: 'Welcome to Lidugog',
          content: 'Welcome to our community! More content coming soon...',
          author: 'Lidugog Admin',
          date: new Date().toISOString(),
          image: blog1
        },
        {
          id: 2,
          title: 'Community Updates',
          content: 'Stay tuned for the latest updates from our community...',
          author: 'Community Team',
          date: new Date(Date.now() - 86400000).toISOString(),
          image: blog2
        }
      ]
    }

    console.log('Successfully fetched posts:', data)

    // Sort posts by date (newest first)
    const sortedPosts = [...data].sort((a, b) => {
      const dateA = new Date(b.date || b.created_at || 0)
      const dateB = new Date(a.date || a.created_at || 0)
      return dateA - dateB
    })

    // Process and format posts
    allPosts.value = sortedPosts.map((post, idx) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date || post.created_at,
      author: post.author || 'Lidugog Blog',
      likes: post.likes || 0,
      image: post.image || (idx % 3 === 0 ? blog1 : idx % 3 === 1 ? blog2 : blog3)
    }))
  } catch (e) {
    console.error('Error loading posts:', e)
    error.value = 'Failed to load blog posts'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.blog-page {
  min-height: 100vh;
  background: var(--bg-primary);
}

.hero-section {
  position: relative;
  padding: var(--space-3xl) 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-light);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 150%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 80% -50%, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%);
  pointer-events: none;
}

.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
  position: relative;
  z-index: 1;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
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

.hero-content h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: var(--space-lg);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.hero-description {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto var(--space-2xl);
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
  padding: var(--space-sm);
  background: rgba(255,255,255,0.1);
  border-radius: var(--radius-2xl);
  backdrop-filter: blur(8px);
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: var(--space-lg);
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  font-size: 1.125rem;
}

.search-input {
  width: 100%;
  padding: var(--space-lg) var(--space-lg) var(--space-lg) var(--space-3xl);
  border: 2px solid transparent;
  border-radius: var(--radius-xl);
  background: var(--bg-primary);
  font-size: 1rem;
  color: var(--text-primary);
  transition: all var(--transition-normal);
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.blog-posts-section {
  position: relative;
  padding: var(--space-3xl) 0;
  margin-top: -4rem;
  background: var(--bg-primary);
  border-radius: var(--radius-2xl) var(--radius-2xl) 0 0;
  box-shadow: var(--shadow-lg);
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

.posts-grid {
  margin-top: var(--space-2xl);
}

.posts-container {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
  margin-top: var(--space-3xl);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: var(--space-3xl);
  margin: var(--space-2xl) auto;
  max-width: 600px;
  animation: fadeIn 0.6s ease;
  background: var(--bg-secondary);
  border-radius: var(--radius-2xl);
  border: 1px solid var(--border-light);
  box-shadow: var(--shadow-xl);
}

/* Loading State */
.loading-spinner {
  width: 64px;
  height: 64px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  margin: 0 auto var(--space-xl);
  animation: spin 1.2s cubic-bezier(0.5, 0.1, 0.5, 0.9) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 1.25rem;
  font-weight: 500;
}

/* Error State */
.error-state {
  background: linear-gradient(135deg, var(--bg-error) 0%, var(--bg-secondary) 100%);
  border: none;
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-xl);
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-icon i {
  font-size: 2rem;
  color: #ef4444;
}

.error-state h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xl);
}

.error-state p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  margin-bottom: var(--space-xl);
}

.retry-btn {
  padding: var(--space-md) var(--space-xl);
  background: var(--gradient-primary);
  color: var(--text-light);
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: var(--space-md);
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.retry-btn i {
  transition: transform var(--transition-normal);
}

.retry-btn:hover i {
  transform: rotate(180deg);
}

/* Empty State */
.empty-state {
  background: linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%);
}

.empty-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-xl);
  background: var(--gradient-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-icon i {
  font-size: 2rem;
  color: var(--text-light);
}

.empty-state h3 {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--space-xl);
}

.empty-state p {
  color: var(--text-secondary);
  font-size: 1.125rem;
  max-width: 400px;
  margin: 0 auto;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .container {
    max-width: 900px;
  }
}

@media (max-width: 1024px) {
  .blog-posts-section {
    margin-top: -2rem;
  }

  .container {
    max-width: 800px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: var(--space-2xl) 0;
  }

  .hero-content h1 {
    font-size: clamp(2rem, 4vw, 2.5rem);
  }
  
  .hero-description {
    font-size: 1rem;
    padding: 0 var(--space-md);
  }
  
  .blog-posts-section {
    padding: var(--space-xl) 0;
    margin-top: -1rem;
  }

  .search-container {
    margin: 0 var(--space-md);
  }
  
  .search-input {
    padding: var(--space-md) var(--space-lg) var(--space-md) var(--space-3xl);
  }

  .loading-state,
  .error-state,
  .empty-state {
    padding: var(--space-2xl);
    margin: var(--space-xl) var(--space-md);
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: var(--space-xl) 0;
  }

  .welcome-tag {
    font-size: 0.75rem;
    padding: var(--space-xs) var(--space-md);
  }

  .hero-content h1 {
    font-size: clamp(1.75rem, 3vw, 2rem);
  }

  .hero-description {
    font-size: 0.875rem;
  }

  .search-container {
    margin: 0;
  }

  .search-input {
    padding: var(--space-sm) var(--space-lg) var(--space-sm) var(--space-2xl);
    font-size: 0.875rem;
  }

  .search-icon {
    left: var(--space-md);
    font-size: 1rem;
  }
}
</style>
