<template>
  <div class="blog-page">
    <header class="blog-header">
      <div class="header-content">
        <h1>All Blog Posts</h1>
        <p class="header-description">Explore our collection of thoughtful insights and stories</p>
      </div>
    </header>

    <section class="all-blogs-section">
      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="loading-spinner"></div>
        <p>Loading blog posts...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="error-state">
        <div class="error-icon">⚠️</div>
        <h3>{{ error }}</h3>
        <p>Please try again later</p>
        <button @click="loadPosts" class="retry-btn">
          Retry
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="!allPosts.length" class="empty-state">
        <div class="empty-icon">📝</div>
        <h3>No Posts Yet</h3>
        <p>Check back soon for new content!</p>
      </div>

      <!-- Posts List -->
      <template v-else>
        <!-- Search and Filter (optional) -->
        <div class="blog-controls">
          <div class="search-box">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search posts..."
              class="search-input"
            >
          </div>
        </div>

        <BlogList 
          :posts="filteredPosts" 
          :showReadMore="false" 
          :showFullPost="true" 
        />
      </template>
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
  width: 100%;
  min-height: 100vh;
  background: var(--light-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
}

.blog-header {
  width: 100%;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: var(--text-light);
  padding: 6rem 0 8rem;
  margin-bottom: -4rem;
  position: relative;
  overflow: hidden;
}

.blog-header::before {
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

.blog-header::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background: linear-gradient(to bottom right, transparent 49.5%, var(--light-bg) 50%);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
}

.header-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #fff, rgba(255,255,255,0.8));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-description {
  font-size: 1.25rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.all-blogs-section {
  width: 100%;
  max-width: 1200px;
  padding: 0 1rem;
}

.blog-controls {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 2rem;
  padding: 0 2rem;
}

.search-box {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-input {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(99, 102, 241, 0.1);
  border-radius: 12px;
  background: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.header-content h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.header-description {
  font-size: 1.2rem;
  opacity: 0.9;
}

.all-blogs-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.blog-controls {
  margin-bottom: 2rem;
  display: flex;
  justify-content: flex-end;
}

.search-box {
  width: 100%;
  max-width: 400px;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

/* States */
.loading-state,
.error-state,
.empty-state {
  text-align: center;
  padding: 6rem 0;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 600px;
}

/* Loading State */
.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--border-color);
  border-top-color: var(--primary-color);
  border-radius: 50%;
  margin: 0 auto 2rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

/* Error State */
.error-state {
  color: #ef4444;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.error-state p {
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.retry-btn {
  padding: 0.75rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Empty State */
.empty-state {
  color: var(--text-secondary);
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.empty-state p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2rem;
  }
  
  .header-description {
    font-size: 1rem;
  }
  
  .all-blogs-section {
    padding: 1rem;
  }
  
  .blog-controls {
    flex-direction: column;
  }
  
  .search-box {
    max-width: none;
    margin-bottom: 1rem;
  }
}
</style>
