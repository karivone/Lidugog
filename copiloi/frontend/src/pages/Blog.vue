<template>
  <div class="blog-page">
    <!-- Hero Section -->
    <section class="blog-hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
      </div>
      <div class="hero-content">
        <span class="category-badge">Blog</span>
        <h1 class="hero-title">Stories & Insights</h1>
        <p class="hero-subtitle">
          Explore our collection of thoughtful insights, personal experiences, and stories 
          about faith, growth, and meaningful connections.
        </p>
        
        <!-- Search & Filter Bar -->
        <div class="search-filter-bar">
          <div class="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Search articles..."
              class="search-input"
            >
            <button v-if="searchQuery" @click="searchQuery = ''" class="clear-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          
          <div class="filter-tags">
            <button 
              :class="['filter-tag', { active: selectedCategory === 'all' }]"
              @click="selectedCategory = 'all'"
            >
              All Posts
            </button>
            <button 
              :class="['filter-tag', { active: selectedCategory === 'faith' }]"
              @click="selectedCategory = 'faith'"
            >
              Faith
            </button>
            <button 
              :class="['filter-tag', { active: selectedCategory === 'life' }]"
              @click="selectedCategory = 'life'"
            >
              Life
            </button>
            <button 
              :class="['filter-tag', { active: selectedCategory === 'growth' }]"
              @click="selectedCategory = 'growth'"
            >
              Growth
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content Section -->
    <section class="blog-content">
      <div class="container">
        <!-- Loading State -->
        <div v-if="isLoading" class="loading-state">
          <div class="loading-animation">
            <div class="loading-spinner"></div>
            <div class="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <p class="loading-text">Discovering stories for you...</p>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <div class="error-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3>{{ error }}</h3>
          <p>We're having trouble loading the posts. Please try again.</p>
          <button @click="loadPosts" class="retry-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            <span>Try Again</span>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="!allPosts.length" class="empty-state">
          <div class="empty-illustration">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14,2 14,8 20,8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10,9 9,9 8,9"/>
            </svg>
          </div>
          <h3>No Stories Yet</h3>
          <p>We're crafting meaningful content for you. Check back soon!</p>
          <router-link to="/subscribe" class="subscribe-cta">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            Subscribe for Updates
          </router-link>
        </div>

        <!-- Posts Grid -->
        <div v-else class="posts-section">
          <!-- Results Header -->
          <div class="results-header">
            <div class="results-info">
              <h2 v-if="searchQuery">Search Results</h2>
              <h2 v-else-if="selectedCategory !== 'all'">{{ selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) }} Posts</h2>
              <h2 v-else>Latest Stories</h2>
              <span class="results-count">{{ filteredPosts.length }} article{{ filteredPosts.length !== 1 ? 's' : '' }}</span>
            </div>
            
            <div class="sort-dropdown">
              <select v-model="sortBy" class="sort-select">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
          </div>

          <!-- No Results -->
          <div v-if="filteredPosts.length === 0" class="no-results">
            <div class="no-results-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
            <h3>No posts found</h3>
            <p>Try adjusting your search or filter to find what you're looking for.</p>
            <button @click="clearFilters" class="clear-filters-btn">Clear Filters</button>
          </div>

          <!-- Blog Cards Grid -->
          <div v-else class="blog-grid">
            <article 
              v-for="(post, index) in sortedPosts" 
              :key="post.id" 
              class="blog-card"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <router-link :to="`/blog/${post.id}`" class="card-link">
                <div class="card-image">
                  <img :src="post.image" :alt="post.title" />
                  <div class="card-overlay">
                    <span class="read-more">Read Article</span>
                  </div>
                </div>
                
                <div class="card-content">
                  <div class="card-meta">
                    <span class="card-date">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      {{ formatDate(post.date || post.created_at) }}
                    </span>
                    <span class="card-author">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                      {{ post.author }}
                    </span>
                  </div>
                  
                  <h3 class="card-title">{{ post.title }}</h3>
                  
                  <p class="card-excerpt">{{ getExcerpt(post.content) }}</p>
                  
                  <div class="card-footer">
                    <span class="read-time">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12,6 12,12 16,14"/>
                      </svg>
                      {{ calculateReadTime(post.content) }} min read
                    </span>
                    <span class="card-likes">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      {{ post.likes || 0 }}
                    </span>
                  </div>
                </div>
              </router-link>
            </article>
          </div>

          <!-- Pagination (if needed) -->
          <div v-if="totalPages > 1" class="pagination">
            <button 
              @click="currentPage--" 
              :disabled="currentPage === 1"
              class="page-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15,18 9,12 15,6"/>
              </svg>
            </button>
            
            <div class="page-numbers">
              <button 
                v-for="page in visiblePages" 
                :key="page"
                @click="currentPage = page"
                :class="['page-number', { active: currentPage === page }]"
              >
                {{ page }}
              </button>
            </div>
            
            <button 
              @click="currentPage++" 
              :disabled="currentPage === totalPages"
              class="page-btn"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

const allPosts = ref([])
const isLoading = ref(true)
const error = ref(null)
const searchQuery = ref('')
const selectedCategory = ref('all')
const sortBy = ref('newest')
const currentPage = ref(1)
const postsPerPage = 9

// Fetch and process posts from the backend
async function loadPosts() {
  isLoading.value = true
  error.value = null
  
  try {
    const response = await fetch('http://localhost:4000/api/posts', {
      headers: { 'Accept': 'application/json' }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }

    const data = await response.json()

    if (!Array.isArray(data)) {
      throw new Error('Invalid response from server')
    }

    // Process and format posts
    allPosts.value = data.map((post, idx) => ({
      id: post.id,
      title: post.title,
      content: post.content,
      date: post.date || post.created_at,
      author: post.author || 'Lidugog Blog',
      likes: post.likes || 0,
      category: post.category || 'life',
      image: post.image || (idx % 3 === 0 ? blog1 : idx % 3 === 1 ? blog2 : blog3)
    }))
  } catch (err) {
    console.error('Error loading posts:', err)
    error.value = 'Failed to load blog posts'
  } finally {
    isLoading.value = false
  }
}

// Load posts when component mounts
onMounted(() => {
  loadPosts()
})

// Reset filters
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  sortBy.value = 'newest'
}

// Calculate read time helper
function calculateReadTime(content) {
  if (!content) return 1
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

// Computed property for filtered posts
const filteredPosts = computed(() => {
  let posts = allPosts.value

  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post => 
      post.title?.toLowerCase().includes(query) ||
      post.content?.toLowerCase().includes(query) ||
      post.author?.toLowerCase().includes(query)
    )
  }

  // Filter by category (you'd need to add category field to posts)
  if (selectedCategory.value !== 'all') {
    posts = posts.filter(post => post.category === selectedCategory.value)
  }

  return posts
})

// Computed property for sorted posts
const sortedPosts = computed(() => {
  const posts = [...filteredPosts.value]
  
  switch (sortBy.value) {
    case 'newest':
      return posts.sort((a, b) => new Date(b.date || b.created_at) - new Date(a.date || a.created_at))
    case 'oldest':
      return posts.sort((a, b) => new Date(a.date || a.created_at) - new Date(b.date || b.created_at))
    case 'popular':
      return posts.sort((a, b) => (b.likes || 0) - (a.likes || 0))
    default:
      return posts
  }
})

// Pagination computed properties
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))
const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Helper functions
function formatDate(dateStr) {
  if (!dateStr) return 'Recently'
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function getExcerpt(content, maxLength = 150) {
  if (!content) return 'Click to read more...'
  const text = content.replace(/<[^>]*>/g, '').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// End of script

</script>

<style scoped>
/* Page Layout */
.blog-page {
  min-height: 100vh;
  background: #fafbfc;
}

/* Hero Section */
.blog-hero {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5rem 2rem 8rem;
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
  background-image: 
    radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0);
  background-size: 40px 40px;
}

.hero-content {
  position: relative;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.category-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.2);
  border-radius: 50px;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 1.5rem;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.5vw, 1.3rem);
  line-height: 1.6;
  opacity: 0.95;
  max-width: 700px;
  margin: 0 auto 3rem;
}

/* Search & Filter Bar */
.search-filter-bar {
  max-width: 800px;
  margin: 0 auto;
}

.search-box {
  position: relative;
  margin-bottom: 1.5rem;
}

.search-box svg:first-child {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 1rem 3.5rem 1rem 3rem;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 15px 40px rgba(0,0,0,0.2);
}

.clear-btn {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: #f0f0f0;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  background: #e0e0e0;
}

.filter-tags {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-tag {
  padding: 0.5rem 1.25rem;
  background: rgba(255,255,255,0.2);
  border: 2px solid transparent;
  border-radius: 50px;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-tag:hover {
  background: rgba(255,255,255,0.3);
}

.filter-tag.active {
  background: white;
  color: #667eea;
  border-color: white;
}

/* Blog Content Section */
.blog-content {
  margin-top: -5rem;
  position: relative;
  z-index: 2;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Loading State */
.loading-state {
  background: white;
  border-radius: 24px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.loading-animation {
  margin-bottom: 2rem;
}

.loading-spinner {
  width: 64px;
  height: 64px;
  border: 4px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

.loading-dots {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background: #667eea;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out;
}

.loading-dots span:nth-child(1) { animation-delay: -0.32s; }
.loading-dots span:nth-child(2) { animation-delay: -0.16s; }

.loading-text {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Error State */
.error-state {
  background: white;
  border-radius: 24px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.error-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ef4444;
}

.error-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.error-state p {
  color: #666;
  margin-bottom: 2rem;
}

.retry-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Empty State */
.empty-state {
  background: white;
  border-radius: 24px;
  padding: 4rem 2rem;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.empty-illustration {
  color: #667eea;
  margin-bottom: 2rem;
}

.empty-state h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: #666;
  margin-bottom: 2rem;
}

.subscribe-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.subscribe-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Posts Section */
.posts-section {
  background: white;
  border-radius: 24px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.results-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #f0f0f0;
}

.results-info h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.results-count {
  color: #888;
  font-size: 0.9rem;
}

.sort-select {
  padding: 0.5rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sort-select:focus {
  outline: none;
  border-color: #667eea;
}

/* No Results */
.no-results {
  text-align: center;
  padding: 3rem 2rem;
}

.no-results-icon {
  color: #ccc;
  margin-bottom: 1.5rem;
}

.no-results h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.no-results p {
  color: #666;
  margin-bottom: 1.5rem;
}

.clear-filters-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.clear-filters-btn:hover {
  background: #5a67d8;
}

/* Blog Grid */
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.blog-card {
  background: #fafbfc;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
  opacity: 0;
  animation: fadeInUp 0.6s ease forwards;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.12);
  border-color: #667eea;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-image {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

.read-more {
  color: white;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border: 2px solid white;
  border-radius: 50px;
}

.card-content {
  padding: 1.5rem;
}

.card-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.card-date,
.card-author {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #888;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
}

.read-time,
.card-likes {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: #888;
}

/* Pagination */
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
}

.page-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.page-btn:hover:not(:disabled) {
  border-color: #667eea;
  color: #667eea;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.page-numbers {
  display: flex;
  gap: 0.5rem;
}

.page-number {
  width: 40px;
  height: 40px;
  border: 2px solid #e0e0e0;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;
  color: #666;
}

.page-number:hover {
  border-color: #667eea;
  color: #667eea;
}

.page-number.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

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

/* Responsive Design */
@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .blog-hero {
    padding: 4rem 1.5rem 6rem;
  }

  .search-filter-bar {
    padding: 0 1rem;
  }

  .results-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .posts-section {
    padding: 1.5rem;
  }

  .blog-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .filter-tags {
    gap: 0.5rem;
  }

  .filter-tag {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .blog-hero {
    padding: 3rem 1rem 5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .posts-section {
    padding: 1rem;
    border-radius: 16px;
  }

  .card-content {
    padding: 1rem;
  }

  .search-input {
    padding: 0.875rem 3rem 0.875rem 2.5rem;
    font-size: 0.9rem;
  }
}
</style>