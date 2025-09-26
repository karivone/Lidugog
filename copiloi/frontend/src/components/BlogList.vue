<template>
  <div class="blog-list">
    <div v-for="(post, idx) in posts" :key="post.id" class="blog-card">
      <div class="blog-card-image">
        <img :src="post.image" :alt="post.title" class="blog-img" loading="lazy" />
        <div class="card-overlay"></div>
      </div>
      <div class="blog-card-content">
        <div class="blog-meta">
          <span class="author">
            <i class="fas fa-user"></i> {{ post.author }}
          </span>
          <span class="date">
            <i class="fas fa-calendar"></i> {{ formatDate(post.date) }}
          </span>
          <span class="likes" v-if="post.likes !== undefined">
            <i class="fas fa-heart"></i> {{ post.likes }}
          </span>
        </div>
        <h2 class="blog-title">{{ post.title }}</h2>
        <p class="blog-excerpt">
          <span v-if="expanded[idx]">{{ post.content }}</span>
          <span v-else>{{ post.content?.slice(0, 200) }}{{ post.content?.length > 200 ? '...' : '' }}</span>
        </p>
        <div class="blog-actions">
          <button 
            v-if="showReadMore && post.content?.length > 200" 
            class="btn btn-text" 
            @click="toggle(idx)"
          >
            {{ expanded[idx] ? 'Show Less' : 'Read More' }}
            <i :class="expanded[idx] ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
          </button>
          <router-link 
            v-if="showFullPost" 
            :to="fullPostLink(post)" 
            class="btn btn-primary"
          >
            Read Post
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  },
  showReadMore: {
    type: Boolean,
    default: true
  },
  showFullPost: {
    type: Boolean,
    default: true
  },
  fullPostRoute: {
    type: [String, Function],
    default: undefined
  }
})

// Format date to a readable string
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return dateString

  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', options)
}

// Generate full post link
function fullPostLink(post) {
  if (typeof props.fullPostRoute === 'function') {
    return props.fullPostRoute(post)
  } else if (typeof props.fullPostRoute === 'string') {
    return props.fullPostRoute
  }
  return { name: 'BlogPost', params: { id: post.id } }
}

// Track expanded state for each post
const expanded = ref([])

// Reset expanded state when posts change
watch(() => props.posts, (newPosts) => {
  expanded.value = Array(newPosts.length).fill(false)
}, { immediate: true })

// Toggle post excerpt expansion
function toggle(idx) {
  expanded.value[idx] = !expanded.value[idx]
}
</script>

<style scoped>
.blog-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-xl);
  margin: 0 auto;
  max-width: 1400px;
}

.blog-card {
  background: var(--bg-primary);
  border-radius: var(--radius-xl);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  transition: all var(--transition-normal);
  border: 1px solid var(--border-light);
  height: 100%;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--shadow-xl);
}

.blog-card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.blog-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.blog-card:hover .blog-img {
  transform: scale(1.05);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    transparent 0%,
    rgba(0, 0, 0, 0.2) 100%
  );
  opacity: 0;
  transition: opacity var(--transition-normal);
}

.blog-card:hover .card-overlay {
  opacity: 1;
}

</style>
