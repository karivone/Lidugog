<template>
  <section class="all-blogs-section">
    <h1>All Blog Posts</h1>
    <BlogList :posts="allPosts" />
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import BlogList from '../components/BlogList.vue'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
const allPosts = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/api/posts')
    const data = await res.json()
    // Optionally, add a default image to each post
    allPosts.value = data.map((post, idx) => ({
      ...post,
      image: idx === 0 ? blog1 : idx === 1 ? blog2 : blog3
    }))
  } catch (e) {
    allPosts.value = []
  }
})
</script>

<style scoped>
.all-blogs-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem auto 0 auto;
  max-width: 1100px;
  width: 100%;
}
.all-blogs-section h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #222;
}
</style>
