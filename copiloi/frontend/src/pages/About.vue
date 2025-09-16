<template>
  <section class="about-section">
    <img src="../assets/Picture.jpeg" alt="Kayewi" class="about-img" />
    <div class="about-desc">
      <h1>Hi, I'm Kayewi</h1>
    <p>{{ aboutText }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const aboutText = ref('')
onMounted(async () => {
  try {
    // This is a mock; backend endpoint not implemented yet
    // const res = await fetch('http://localhost:4000/api/about')
    // const data = await res.json()
    aboutText.value = "Welcome to my blog where I share about life and Christianity in fun ways."
  } catch (e) {
    aboutText.value = "Welcome to my blog where I share about life and Christianity in fun ways."
  }
})
</script>

<style scoped>
.about-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  max-width: 900px;
  margin: 3rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}
.about-img {
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.about-desc {
  flex: 1;
}
.about-desc h1 {
  margin-bottom: 1rem;
  font-size: 2rem;
  color: #222;
}
.about-desc p {
  font-size: 1.2rem;
  color: #444;
}
</style>
