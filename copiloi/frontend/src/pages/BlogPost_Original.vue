<template>
  <section v-if="post" class="blog-post-section">
    <img v-if="post.image" :src="post.image" alt="Blog image" class="blog-post-img" />
    <h1>{{ post.title }}</h1>
    <p class="meta">By {{ post.author }} | {{ post.date }}</p>
    <p class="summary">{{ post.summary }}</p>

    <!-- Like and Share Row -->
    <div class="like-share-row">
      <button class="like-btn" @click="likePost">👍 Like ({{ likes }})</button>
      <button class="share-btn" @click="sharePost">🔗 Share</button>
    </div>

    <!-- Comments Section -->
    <div class="comments-section">
      <h2>Comments</h2>
      <form class="comment-form" @submit.prevent="submitComment">
        <input v-model="commentName" type="text" placeholder="Your Name" required />
        <textarea v-model="commentText" placeholder="Add a comment..." required rows="2"></textarea>
        <button type="submit">Post Comment</button>
      </form>
      <ul class="comments-list">
        <li v-for="comment in comments" :key="comment.id">
          <strong>{{ comment.name }}</strong> <span class="comment-date">{{ formatDate(comment.date) }}</span>
          <p>{{ comment.text }}</p>
        </li>
      </ul>
    </div>
  </section>
  <section v-else class="blog-post-section">
    <p>Loading post...</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}

async function fetchComments() {
  const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/comments`)
  if (res.ok) comments.value = await res.json()
}

async function fetchLikes() {
  const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/likes`)
  if (res.ok) likes.value = (await res.json()).likes
}

async function likePost() {
  const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}/likes`, { method: 'POST' })
  if (res.ok) likes.value = (await res.json()).likes
}

async function submitComment() {
  if (!commentName.value || !commentText.value) return
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

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/posts/${route.params.id}`)
    if (!res.ok) return
    const data = await res.json()
    // Assign a default image if missing
    if (!data.image) {
      const idx = (parseInt(route.params.id) - 1) % 3
      data.image = idx === 0 ? blog1 : idx === 1 ? blog2 : blog3
    }
    post.value = data
    await fetchComments()
    await fetchLikes()
  } catch (e) {
    post.value = null
  }
})
</script>

<style scoped>
.blog-post-section {
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.blog-post-img {
  width: 100%;
  max-width: 500px;
  height: 260px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}
.blog-post-section h1 {
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
  color: #222;
  text-align: center;
}
.meta {
  font-size: 1rem;
  color: #888;
  margin-bottom: 1.5rem;
}
.summary {
  font-size: 1.15rem;
  color: #333;
  line-height: 1.7;
  text-align: left;
}

.like-share-row {
  display: flex;
  gap: 1.5rem;
  margin: 1.5rem 0 1rem 0;
}
.like-btn, .share-btn {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.like-btn:hover, .share-btn:hover {
  background: #369e6f;
}
.comments-section {
  width: 100%;
  margin-top: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.comments-section h2 {
  margin-bottom: 1rem;
  color: #222;
}
.comment-form {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  margin-bottom: 1.5rem;
}
.comment-form input, .comment-form textarea {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}
.comment-form button {
  align-self: flex-end;
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}
.comment-form button:hover {
  background: #369e6f;
}
.comments-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.comments-list li {
  margin-bottom: 1.2rem;
  background: #fff;
  border-radius: 6px;
  padding: 0.7rem 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}
.comment-date {
  color: #888;
  font-size: 0.9rem;
  margin-left: 0.5rem;
}
</style>
