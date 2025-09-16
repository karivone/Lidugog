<template>
  <section class="contact-section">
    <h1>Contact</h1>
    <form class="contact-form" @submit.prevent="sendContact">
      <input v-model="name" type="text" placeholder="Your Name*" required />
      <input v-model="email" type="email" placeholder="Your Email*" required />
      <textarea v-model="messageText" placeholder="Your Message*" required rows="5"></textarea>
      <button type="submit">Send Message</button>
    </form>
    <p v-if="responseMsg" class="success-msg">{{ responseMsg }}</p>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const messageText = ref('')
const responseMsg = ref('')
async function sendContact() {
  if (!name.value || !email.value || !messageText.value) {
    responseMsg.value = 'Please fill all fields.'
    return
  }
  try {
    const res = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.value, email: email.value, message: messageText.value })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error || 'Submission failed')
    responseMsg.value = data.message || 'Thank you for reaching out!'
    name.value = ''
    email.value = ''
    messageText.value = ''
  } catch (e) {
    responseMsg.value = e.message || 'Submission failed.'
  }
}
</script>

<style scoped>
.contact-section {
  max-width: 480px;
  margin: 3rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 2.5rem 2rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contact-section h1 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #222;
  text-align: center;
}
.contact-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.contact-form input,
.contact-form textarea {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
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
  text-align: center;
}
</style>
