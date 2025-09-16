<template>
  <div class="blog-list">
    <div v-for="post in posts" :key="post.id" class="blog-card">
  <img :src="post.image" alt="Blog image" class="blog-img" />
      <h2>{{ post.title }}</h2>
      <p class="meta">By {{ post.author }} | {{ post.date }}</p>
      <p>{{ post.summary }}</p>
      <router-link :to="`/blog/${post.id}`">Read more</router-link>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
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
</style>
