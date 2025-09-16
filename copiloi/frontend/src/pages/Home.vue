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
  <BlogList :posts="recentPosts" :showReadMore="false" :showFullPost="true" :fullPostRoute="post => `/blog/${post.id}`" />
      <router-link to="/blog" class="see-all">See all posts &rarr;</router-link>
    </section>
    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-info">
          <h2>Inner Pieces</h2>
          <p>123-456-7890</p>
          <p>info@mysite.com</p>
          <div class="social-links">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1da1f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.4.36a9.09 9.09 0 0 1-2.88 1.1A4.48 4.48 0 0 0 16.11 0c-2.5 0-4.51 2.01-4.51 4.5 0 .35.04.7.11 1.03C7.69 5.4 4.07 3.7 1.64 1.15c-.38.65-.6 1.4-.6 2.2 0 1.52.77 2.86 1.94 3.65A4.48 4.48 0 0 1 .96 6v.06c0 2.13 1.52 3.91 3.54 4.31-.37.1-.76.16-1.16.16-.28 0-.55-.03-.81-.08.55 1.7 2.16 2.94 4.07 2.97A9.05 9.05 0 0 1 0 20.29a12.8 12.8 0 0 0 6.95 2.04c8.34 0 12.9-6.91 12.9-12.9 0-.2 0-.39-.01-.58A9.22 9.22 0 0 0 23 3z"/></svg>
            </a>
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1877f3" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://instagram.com" target="_blank" aria-label="Instagram" class="social-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e4405f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.5" y2="6.5"/></svg>
            </a>
          </div>
          <p class="copyright">© 2035 by Inner Pieces.</p>
        </div>
        <div class="contact-form-wrap">
          <h1>Contact</h1>
          <p class="subtitle">Ask me anything</p>
          <form class="contact-form" @submit.prevent="sendContact">
            <div class="row">
              <input v-model="firstName" type="text" placeholder="First Name*" required />
              <input v-model="lastName" type="text" placeholder="Last Name*" required />
            </div>
            <input v-model="email" type="email" placeholder="Email*" required />
            <textarea v-model="messageText" placeholder="Leave Us a Message..." required rows="5"></textarea>
            <button type="submit">Submit</button>
          </form>
          <p v-if="responseMsg" class="success-msg">{{ responseMsg }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const firstName = ref('')
const lastName = ref('')
const email = ref('')
const messageText = ref('')
const responseMsg = ref('')
async function sendContact() {
  if (!firstName.value || !lastName.value || !email.value || !messageText.value) {
    responseMsg.value = 'Please fill all fields.'
    return
  }
  try {
    const res = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `${firstName.value} ${lastName.value}`, email: email.value, message: messageText.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Submission failed')
    responseMsg.value = data.message || 'Thank you for reaching out!'
    firstName.value = ''
    lastName.value = ''
    email.value = ''
    messageText.value = ''
  } catch (e) {
    responseMsg.value = e.message || 'Submission failed.'
  }
}
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
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  height: 340px;
  overflow: hidden;
  border-radius: 0;
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
  margin: 3rem 0 0 0;
  width: 70vw;
  max-width: none;
  padding: 0 4vw;
  box-sizing: border-box;
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
<style scoped>
.contact-section {
  width: 70vw;
  max-width: none;
  margin: 3rem 0;
  background: #fff;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2.5rem 4vw 2rem 4vw;
  box-sizing: border-box;
}
.contact-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.1rem;
}
.contact-info {
  min-width: 220px;
  max-width: 260px;
  text-align: left;
  color: #444;
  margin-top: 0.5rem;
}
.contact-info h2 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #222;
}
.contact-info p {
  margin: 0.2rem 0;
  font-size: 1rem;
}
.social-links {
  display: flex;
  gap: 0.7rem;
  margin: 0.7rem 0 0.7rem 0;
}
.social-icon svg {
  display: block;
  transition: transform 0.15s;
}
.social-icon:hover svg {
  transform: scale(1.15);
  filter: brightness(1.2);
}
.copyright {
  margin-top: 1.2rem;
  font-size: 0.95rem;
  color: #888;
}
.contact-form-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 260px;
  max-width: 420px;
  margin-left: auto;
}
.contact-form-wrap h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #222;
  text-align: left;
  width: 100%;
}
.subtitle {
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 1.5rem;
  text-align: left;
  width: 100%;
}
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
.contact-form .row {
  display: flex;
  gap: 1rem;
}
.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  width: 100%;
}
.contact-form .row input {
  flex: 1;
}
.contact-form button {
  background: #42b983;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
.contact-form button:hover {
  background: #369e6f;
}
.success-msg {
  color: #42b983;
  margin-top: 1rem;
  text-align: left;
  width: 100%;
}
@media (max-width: 700px) {
  .contact-container {
    flex-direction: column;
    gap: 1.5rem;
  }
  .contact-info, .contact-form-wrap {
    max-width: 100%;
    min-width: 0;
    margin-left: 0;
    align-items: flex-start;
  }
  .contact-form-wrap h1, .subtitle, .success-msg {
    text-align: left;
  }
}
</style>
