<template>
  <div class="blog-post-page">
    <!-- Loading State -->
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading article...</p>
    </div>

    <!-- Post Content -->
    <article v-else-if="post" class="post-article">
      <!-- Hero Section -->
      <section class="post-hero">
        <div class="hero-background">
          <img v-if="post.image" :src="post.image" :alt="post.title" class="hero-image" />
          <div class="hero-overlay"></div>
        </div>
        
        <div class="hero-content">
          <div class="container">
            <div class="breadcrumb">
              <router-link to="/">Home</router-link>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
              <router-link to="/blog">Blog</router-link>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9,18 15,12 9,6"/>
              </svg>
              <span>{{ post.title }}</span>
            </div>
            
            <h1 class="post-title">{{ post.title }}</h1>
            
            <div class="post-meta">
              <div class="author-info">
                <div class="author-avatar">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="author-details">
                  <span class="author-name">{{ post.author }}</span>
                  <span class="post-date">{{ formatDate(post.date || post.created_at) }}</span>
                </div>
              </div>
              
              <div class="post-stats">
                <span class="stat-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                  {{ calculateReadTime(post.content) }} min read
                </span>
                <span class="stat-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  {{ likes }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Post Body -->
      <section class="post-body">
        <div class="container">
          <div class="post-content">
            <div class="content-main">
              <div class="post-text" v-html="formatContent(post.content || post.summary)"></div>
              
              <!-- Action Buttons -->
              <div class="post-actions">
                <button @click="likePost" class="action-btn like-btn" :class="{ liked: hasLiked }">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  <span>{{ hasLiked ? 'Liked' : 'Like' }}</span>
                  <span class="count">{{ likes }}</span>
                </button>
                
                <button @click="sharePost" class="action-btn share-btn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                  <span>Share</span>
                </button>
              </div>

              <!-- Tags -->
              <div v-if="post.tags && post.tags.length" class="post-tags">
                <span class="tag" v-for="tag in post.tags" :key="tag">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Sidebar -->
            <aside class="content-sidebar">
              <div class="sidebar-card author-card">
                <h3>About the Author</h3>
                <div class="author-profile">
                  <div class="author-avatar-large">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                  </div>
                  <h4>{{ post.author }}</h4>
                  <p>Writer and storyteller passionate about faith, life, and meaningful connections.</p>
                </div>
              </div>

              <div class="sidebar-card share-card">
                <h3>Share this article</h3>
                <div class="share-buttons">
                  <button @click="shareToTwitter" class="share-social twitter">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                    </svg>
                    Twitter
                  </button>
                  <button @click="shareToFacebook" class="share-social facebook">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                    Facebook
                  </button>
                  <button @click="shareToLinkedIn" class="share-social linkedin">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                    LinkedIn
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <!-- Comments Section -->
      <section class="comments-section">
        <div class="container">
          <div class="comments-container">
            <h2 class="comments-title">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              Comments ({{ comments.length }})
            </h2>

            <!-- Comment Form -->
            <form class="comment-form" @submit.prevent="submitComment">
              <h3>Leave a Comment</h3>
              <div class="form-group">
                <label for="commentName">Your Name *</label>
                <input 
                  v-model="commentName" 
                  type="text" 
                  id="commentName"
                  placeholder="Enter your name" 
                  required 
                />
              </div>
              <div class="form-group">
                <label for="commentText">Your Comment *</label>
                <textarea 
                  v-model="commentText" 
                  id="commentText"
                  placeholder="Share your thoughts..." 
                  required 
                  rows="4"
                ></textarea>
              </div>
              <button type="submit" class="submit-comment-btn" :disabled="isSubmittingComment">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
                {{ isSubmittingComment ? 'Posting...' : 'Post Comment' }}
              </button>
            </form>

            <!-- Comments List -->
            <div class="comments-list">
              <div v-if="comments.length === 0" class="no-comments">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <p>No comments yet. Be the first to share your thoughts!</p>
              </div>
              
              <div v-else class="comment-item" v-for="comment in comments" :key="comment.id">
                <div class="comment-avatar">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <strong class="comment-author">{{ comment.name }}</strong>
                    <span class="comment-date">{{ formatCommentDate(comment.date) }}</span>
                  </div>
                  <p class="comment-text">{{ comment.text }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Related Posts -->
      <section class="related-posts">
        <div class="container">
          <h2 class="section-title">You Might Also Like</h2>
          <div class="related-grid">
            <router-link 
              v-for="relatedPost in relatedPosts" 
              :key="relatedPost.id"
              :to="`/blog/${relatedPost.id}`"
              class="related-card"
            >
              <div class="related-image">
                <img :src="relatedPost.image" :alt="relatedPost.title" />
              </div>
              <div class="related-content">
                <h3>{{ relatedPost.title }}</h3>
                <p>{{ getExcerpt(relatedPost.content) }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </article>

    <!-- Error State -->
    <div v-else class="error-state">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
      <h2>Post Not Found</h2>
      <p>The article you're looking for doesn't exist or has been removed.</p>
      <router-link to="/blog" class="back-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12,19 5,12 12,5"/>
        </svg>
        Back to Blog
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'

const post = ref(null)
const route = useRoute()
const comments = ref([])
const commentName = ref('')
const commentText = ref('')
const likes = ref(0)
const hasLiked = ref(false)
const isLoading = ref(true)
const isSubmittingComment = ref(false)
const relatedPosts = ref([])

function formatDate(dateStr) {
  if (!dateStr) return 'Recently'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

function formatCommentDate(dateStr) {
  const date = new Date(dateStr)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function calculateReadTime(content) {
  if (!content) return 1
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

function getExcerpt(content, maxLength = 100) {
  if (!content) return ''
  const text = content.replace(/<[^>]*>/g, '').trim()
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

function formatContent(content) {
  if (!content) return ''
  // Convert line breaks to paragraphs
  return content.split('\n').map(para => `<p>${para}</p>`).join('')
}

async function fetchComments() {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/comments`)
    if (res.ok) comments.value = await res.json()
  } catch (e) {
    console.error('Error fetching comments:', e)
  }
}

async function fetchLikes() {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/likes`)
    if (res.ok) likes.value = (await res.json()).likes
  } catch (e) {
    console.error('Error fetching likes:', e)
  }
}

async function likePost() {
  if (hasLiked.value) return
  
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/likes`, { 
      method: 'POST' 
    })
    if (res.ok) {
      likes.value = (await res.json()).likes
      hasLiked.value = true
    }
  } catch (e) {
    console.error('Error liking post:', e)
  }
}

async function submitComment() {
  if (!commentName.value || !commentText.value) return
  
  isSubmittingComment.value = true
  
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: commentName.value, text: commentText.value })
    })
    
    if (res.ok) {
      commentName.value = ''
      commentText.value = ''
      await fetchComments()
    }
  } catch (e) {
    console.error('Error submitting comment:', e)
  } finally {
    isSubmittingComment.value = false
  }
}

function sharePost() {
  const url = window.location.href
  if (navigator.share) {
    navigator.share({ title: post.value.title, url })
  } else {
    navigator.clipboard.writeText(url)
    alert('Link copied to clipboard!')
  }
}

function shareToTwitter() {
  const url = encodeURIComponent(window.location.href)
  const text = encodeURIComponent(post.value.title)
  window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
}

function shareToFacebook() {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
}

function shareToLinkedIn() {
  const url = encodeURIComponent(window.location.href)
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
}

async function fetchRelatedPosts() {
  try {
    const res = await fetch('http://localhost:4000/api/posts')
    if (res.ok) {
      const allPosts = await res.json()
      relatedPosts.value = allPosts
        .filter(p => p.id !== parseInt(route.params.id))
        .slice(0, 3)
        .map((p, idx) => ({
          ...p,
          image: p.image || (idx % 3 === 0 ? blog1 : idx % 3 === 1 ? blog2 : blog3)
        }))
    }
  } catch (e) {
    console.error('Error fetching related posts:', e)
  }
}

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}`)
    if (!res.ok) {
      post.value = null
      return
    }
    
    const data = await res.json()
    if (!data.image) {
      const idx = (parseInt(route.params.id) - 1) % 3
      data.image = idx === 0 ? blog1 : idx === 1 ? blog2 : blog3
    }
    post.value = data
    
    await Promise.all([
      fetchComments(),
      fetchLikes(),
      fetchRelatedPosts()
    ])
  } catch (e) {
    console.error('Error loading post:', e)
    post.value = null
  } finally {
    isLoading.value = false
  }
})
</script>

<style scoped>
/* Page Layout */
.blog-post-page {
  min-height: 100vh;
  background: #fafbfc;
}

/* Loading State */
.loading-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
}

.loading-spinner {
  width: 64px;
  height: 64px;
  border: 4px solid #f0f0f0;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-container p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
}

/* Hero Section */
.post-hero {
  position: relative;
  min-height: 60vh;
  display: flex;
  align-items: flex-end;
  padding: 3rem 0;
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: rgba(255,255,255,0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb a:hover {
  color: white;
}

.breadcrumb span {
  color: white;
  font-weight: 500;
}

.post-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 2rem;
  max-width: 900px;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.author-name {
  font-weight: 600;
  font-size: 1.1rem;
}

.post-date {
  font-size: 0.9rem;
  opacity: 0.9;
}

.post-stats {
  display: flex;
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

/* Post Body */
.post-body {
  margin-top: -3rem;
  position: relative;
  z-index: 3;
}

.post-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
  align-items: start;
}

.content-main {
  background: white;
  border-radius: 24px;
  padding: 3rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.post-text {
  font-size: 1.125rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 3rem;
}

.post-text p {
  margin-bottom: 1.5rem;
}

.post-text p:last-child {
  margin-bottom: 0;
}

.post-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.5rem;
  border: 2px solid #e1e8ed;
  background: white;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #555;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.like-btn:hover {
  border-color: #ff6b6b;
  color: #ff6b6b;
}

.like-btn.liked {
  background: #ff6b6b;
  border-color: #ff6b6b;
  color: white;
}

.like-btn.liked svg {
  fill: white;
}

.share-btn:hover {
  border-color: #667eea;
  color: #667eea;
}

.count {
  padding: 0.25rem 0.5rem;
  background: #f0f0f0;
  border-radius: 12px;
  font-size: 0.875rem;
}

.like-btn.liked .count {
  background: rgba(255,255,255,0.3);
  color: white;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag {
  padding: 0.5rem 1rem;
  background: #f0f0f0;
  border-radius: 20px;
  font-size: 0.875rem;
  color: #555;
  font-weight: 500;
}

/* Sidebar */
.content-sidebar {
  position: sticky;
  top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.sidebar-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.author-profile {
  text-align: center;
}

.author-avatar-large {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
}

.author-profile h4 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.author-profile p {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.5;
}

.share-buttons {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.share-social {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  color: white;
}

.share-social:hover {
  transform: translateX(4px);
}

.twitter {
  background: #1da1f2;
}

.facebook {
  background: #1877f2;
}

.linkedin {
  background: #0077b5;
}

/* Comments Section */
.comments-section {
  padding: 4rem 0;
}

.comments-container {
  max-width: 800px;
  margin: 0 auto;
}

.comments-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.comment-form {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 3rem;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.comment-form h3 {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-size: 0.9rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid #e1e8ed;
  border-radius: 12px;
  font-size: 1rem;
  background: #fafbfc;
  transition: all 0.3s ease;
  font-family: inherit;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.submit-comment-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-comment-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

.submit-comment-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.no-comments {
  text-align: center;
  padding: 3rem 2rem;
  background: white;
  border-radius: 16px;
  color: #888;
}

.no-comments svg {
  margin-bottom: 1rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

.comment-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.comment-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #2c3e50;
}

.comment-date {
  font-size: 0.85rem;
  color: #888;
}

.comment-text {
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* Related Posts */
.related-posts {
  padding: 4rem 0;
  background: white;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 2.5rem;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.related-card {
  background: #fafbfc;
  border-radius: 16px;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e1e8ed;
  transition: all 0.3s ease;
}

.related-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.1);
  border-color: #667eea;
}

.related-image {
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.related-card:hover .related-image img {
  transform: scale(1.1);
}

.related-content {
  padding: 1.5rem;
}

.related-content h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-content p {
  color: #555;
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Error State */
.error-state {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.error-state svg {
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.error-state h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.error-state p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
}

/* Animations */
@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .post-content {
    grid-template-columns: 1fr;
  }

  .content-sidebar {
    position: static;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .post-hero {
    min-height: 50vh;
    padding: 2rem 0;
  }

  .post-title {
    font-size: 2rem;
  }

  .post-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .content-main {
    padding: 2rem;
  }

  .post-text {
    font-size: 1rem;
  }

  .post-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
    justify-content: center;
  }

  .related-grid {
    grid-template-columns: 1fr;
  }

  .comment-form,
  .comment-item {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .content-main {
    padding: 1.5rem;
    border-radius: 16px;
  }

  .breadcrumb {
    font-size: 0.8rem;
    margin-bottom: 1.5rem;
  }

  .post-title {
    font-size: 1.75rem;
  }

  .author-avatar {
    width: 48px;
    height: 48px;
  }

  .comment-form {
    padding: 1.25rem;
  }
}
</style>