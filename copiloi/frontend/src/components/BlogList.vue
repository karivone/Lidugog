<template>
  <div class="blog-list">
    <div v-for="(post, idx) in posts" :key="post.id" class="blog-card">
      <img :src="post.image" alt="Blog image" class="blog-img" />
      <h2>{{ post.title }}</h2>
      <p class="meta">By {{ post.author }} | {{ post.date }}</p>
      <p>
        <span v-if="expanded[idx]">{{ post.summary }}</span>
        <span v-else>{{ post.summary.length > 120 ? post.summary.slice(0, 120) + '...' : post.summary }}</span>
      </p>
      <button v-if="showReadMore && post.summary.length > 120" class="readmore-btn" @click="toggle(idx)">
        {{ expanded[idx] ? 'Read Less' : 'Read More' }}
      </button>
  <router-link v-if="showFullPost" :to="fullPostLink(post)">Full Post</router-link>
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

function fullPostLink(post) {
  if (typeof props.fullPostRoute === 'function') {
    return props.fullPostRoute(post)
  } else if (typeof props.fullPostRoute === 'string') {
    return props.fullPostRoute
  }
  return `/blog/${post.id}`
}
const expanded = ref([])
watch(() => props.posts, (val) => {
  expanded.value = Array(val.length).fill(false)
}, { immediate: true })
function toggle(idx) {
  expanded.value[idx] = !expanded.value[idx]
}
</script>

<style scoped>
.blog-list {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.blog-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 0;
  width: 320px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
}
.blog-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  display: block;
}
.blog-card h2 {
  margin: 1rem 1rem 0.5rem 1rem;
}
.blog-card .meta {
  font-size: 0.9rem;
  color: #888;
  margin: 0 1rem 0.5rem 1rem;
}
.blog-card p {
  margin: 0 1rem 1rem 1rem;
}
.blog-card a {
  color: #42b983;
  text-decoration: underline;
  font-weight: bold;
  margin: 0 1rem 1rem 1rem;
}
.readmore-btn {
  background: none;
  border: none;
  color: #42b983;
  font-weight: bold;
  cursor: pointer;
  margin-left: 1rem;
  margin-bottom: 0.5rem;
  padding: 0;
}
.readmore-btn:hover {
  text-decoration: underline;
}
</style>
