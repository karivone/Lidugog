<template>
  <div>
    <section class="hero">
      <img src="../assets/lidugog_banner_e.png" alt="Blog Hero" class="hero-img" />
      <div class="hero-content">
        <h1>Welcome to Lidugog Blog</h1>
        <p class="tagline">Life, Faith, and Fun—All in One Place</p>
        <router-link to="/subscribe" class="cta-btn">Join the Conversation</router-link>
      </div>
    </section>
    <section class="recent-posts-preview">
      <h2>Recent Posts</h2>
      <BlogList :posts="recentPosts" />
      <router-link to="/blog" class="see-all">See all posts &rarr;</router-link>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogList from '../components/BlogList.vue'
import blog1 from '../assets/blog1.png'
import blog2 from '../assets/blog2.jpg'
import blog3 from '../assets/blog3.jpg'
const recentPosts = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:4000/api/posts')
    const data = await res.json()
    // Optionally, add a default image to each post
    recentPosts.value = data.slice(0, 3).map((post, idx) => ({
      ...post,
      image: idx === 0 ? blog1 : idx === 1 ? blog2 : blog3
    }))
  } catch (e) {
    recentPosts.value = []
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  height: 340px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
}
.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.hero-content {
  position: relative;
  z-index: 2;
  color: #fff;
  text-align: center;
  width: 100%;
}
.hero-content h1 {
  font-size: 2.7rem;
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
}
.tagline {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: #ffe9b0;
}
.cta-btn {
  display: inline-block;
  background: #42b983;
  color: #fff;
  padding: 0.8rem 2rem;
  border-radius: 6px;
  font-size: 1.1rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.cta-btn:hover {
  background: #369e6f;
}
.recent-posts-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem auto 0 auto;
  max-width: 1100px;
  width: 100%;
}
.recent-posts-preview h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  color: #222;
}
.see-all {
  margin-top: 1.5rem;
  color: #42b983;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.2s;
}
.see-all:hover {
  color: #369e6f;
}
</style>
